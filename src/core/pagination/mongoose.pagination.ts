import config from '@config/config';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import mongoose, { Model } from 'mongoose';

export const paginate = async ({
  model,
  page,
  limit,
  match = {},
  select = '',
  sort = {},
  populate = [],
}: {
  model: Model<any>;
  page?: number;
  limit?: number;
  match?: any;
  select?: string;
  sort?: any;
  populate?: any[];
}) => {
  page = page ? processPage(page) : 1;
  limit = limit
    ? processLimit(limit)
    : config().pagination.mongoose.defaultLimit;
  const totalDocs = await model.countDocuments(match);
  const totalPages = Math.ceil(totalDocs / limit);
  const skip = processSkip({ limit, page });
  const { nextPage, hasNextPage } = processNext({ page, totalPages });
  const { prevPage, hasPrevPage } = processPrevious({ page });

  let options = {
    allowDiskUse: true,
    lean: true,
    collation: { locale: 'fr' },
    sort,
    skip,
    limit,
    populate,
  };

  const data = await model.find(match, select, options);

  return {
    pagination: {
      totalDocs,
      totalPages,
      page,
      limit,
      hasNextPage,
      nextPage,
      hasPrevPage,
      prevPage,
      returnedDocsCount: data.length,
    },
    data,
  };
};

export const aggregatePaginate = async ({
  model,
  page,
  limit,
  pipeline = [],
}: {
  model: Model<any>;
  page: number;
  limit: number;
  pipeline: any[];
}) => {
  page = processPage(page);
  limit = processLimit(limit);
  const skip = processSkip({ page, limit });

  const matchIndex = pipeline.findIndex((p) => p['$match']);
  let sortIndex = pipeline.findIndex((p) => p['$sort']);
  //console.log(sortIndex, 'sortIndex');
  //console.log(pipeline, 'pipeline');

  //process sort, $sort must be not empty
  if (
    sortIndex > -1 &&
    Object.keys(pipeline[sortIndex]['$sort']).length === 0
  ) {
    pipeline.splice(sortIndex, 1);
    sortIndex = -1;
  }

  let skipIndex = pipeline.findIndex((p) => p['$skip']);
  let limitIndex = pipeline.findIndex((p) => p['$limit']);

  if (skipIndex < 0) {
    if (sortIndex > -1) skipIndex = sortIndex + 1;
    else if (matchIndex > -1) skipIndex = matchIndex + 1;

    pipeline.splice(skipIndex + 1, 0, { $skip: skip });
    limitIndex = skipIndex + 1;
    pipeline.splice(limitIndex, 0, { $limit: limit });
  }

  //console.log(matchIndex, 'matchIndex');
  //console.log(sortIndex, 'sortIndex');
  //console.log(limitIndex, 'limitIndex');
  //console.log(skipIndex, 'skipIndex');

  let options = {
    allowDiskUse: true,
    collation: { locale: 'fr' },
  };
  //sanitize pipeline object
  if (matchIndex > -1) {
    if (pipeline[matchIndex]['$match']['_id']) {
      if (pipeline[matchIndex]['$match']['_id']['$in']) {
        //make sure the _ids are ObjectId and not strings. it doesnt work with strings
        pipeline[matchIndex]['$match']['_id']['$in'] = pipeline[matchIndex][
          '$match'
        ]['_id']['$in'].map((el) => new mongoose.Types.ObjectId(el));
      }
    }
  }

  //console.log(JSON.stringify(pipeline), 'pipeline in pagination helper');
  // console.log(options,'options in helper');
  let data = await model.aggregate(pipeline, options);
  //console.log(data, 'data in helper');

  let result: any = {};
  if (sortIndex > -1 && matchIndex > sortIndex)
    result.message = `its advised to have $match stage before $sort`;
  result.pagination = {};

  if (matchIndex > -1)
    result.pagination.totalDocs = await model.countDocuments(
      pipeline[matchIndex]['$match'],
    );
  else result.pagination.totalDocs = await model.countDocuments({});

  //console.log(result.pagination.totalDocs, 'result.pagination.totalDocs');

  const totalPages = Math.ceil(result.pagination.totalDocs / limit);

  result.pagination.totalPages = totalPages;

  result.pagination.page = page;
  result.pagination.limit = limit;

  const { nextPage, hasNextPage } = processNext({ page, totalPages });
  result.pagination.hasNextPage = hasNextPage;
  result.pagination.nextPage = nextPage;

  const { prevPage, hasPrevPage } = processPrevious({ page });
  result.pagination.hasPrevPage = hasPrevPage;
  result.pagination.prevPage = prevPage;

  result.pagination.returnedDocsCount = data.length;

  result.data = data;

  return result;
};

let processLimit = (limit) => {
  limit = parseInt(limit) || config().pagination.mongoose.defaultLimit;
  if (limit < config().pagination.mongoose.minLimit)
    limit = config().pagination.mongoose.minLimit;
  if (limit > config().pagination.mongoose.maxLimit)
    limit = config().pagination.mongoose.maxLimit;
  return limit;
};

let processPage = (page) => {
  page = parseInt(page) || 1;
  if (page < 1) page = 1;
  return page;
};

let processSkip = ({ page, limit }) => {
  let skip = 0;
  if (page > 1) skip = (page - 1) * limit;
  return skip;
};

let processNext = ({ page, totalPages }) => {
  let hasNextPage = false;
  let nextPage = null;
  if (page + 1 <= totalPages) {
    hasNextPage = true;
    nextPage = page + 1;
  }
  return { nextPage, hasNextPage };
};

let processPrevious = ({ page }) => {
  let hasPrevPage = false;
  let prevPage = null;
  if (page - 1 >= 1) {
    hasPrevPage = true;
    prevPage = page - 1;
  }
  return { hasPrevPage, prevPage };
};

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: 'page',
  })
  public page: number;

  @IsOptional()
  @IsNumber()
  @Min(config().pagination.mongoose.minLimit)
  @Max(config().pagination.mongoose.maxLimit)
  @ApiProperty({
    type: Number,
    description: 'limit',
  })
  public limit: number;
}

export class PageDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: 'page',
  })
  public page: number;
}

export class LimitDto {
  @IsOptional()
  @IsNumber()
  @Min(config().pagination.mongoose.minLimit)
  @Max(config().pagination.mongoose.maxLimit)
  @ApiProperty({
    type: Number,
    description: 'limit',
  })
  public limit: number;
}
