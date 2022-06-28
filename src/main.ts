import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { simpleEstimator } from 'graphql-query-complexity';
import { createComplexityRule } from 'graphql-query-complexity';
import * as helmet from 'helmet';
import { GraphQLError } from 'graphql/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const rule = createComplexityRule({
    // The maximum allowed query complexity, queries above this threshold will be rejected
    maximumComplexity: 50,

    // Optional callback function to retrieve the determined query complexity
    // Will be invoked whether the query is rejected or not
    // This can be used for logging or to implement rate limiting
    onComplete: (complexity: number) => {
      console.log('Determined query complexity: ', complexity);
    },

    // Optional function to create a custom error
    createError: (max: number, actual: number) => {
      return new GraphQLError(
        `Query is too complex: ${actual}. Maximum allowed complexity: ${max}`,
      );
    },

    // Add any number of estimators. The estimators are invoked in order, the first
    // numeric value that is being returned by an estimator is used as the field complexity.
    // If no estimator returns a value, an exception is raised.
    estimators: [
      // Add more estimators here...

      // This will assign each field a complexity of 1 if no other estimator
      // returned a value.
      simpleEstimator({
        defaultComplexity: 1,
      }),
    ],
  });

  app.enableCors();
  app.use(helmet, helmet.xssFilter());
  /**
   *  todo
   * https://github.com/MichalLytek/type-graphql/tree/master/examples/query-complexity
   *
   */

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
