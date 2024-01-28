import { render, screen } from '@testing-library/react-native';
import { NativeRouter } from 'react-router-native';
import { RepositoryListContainer } from '../components/RepositoryList';
import { numberToStatDisplayFigure } from '../components/RepositoryItem';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(
        <NativeRouter>
          <RepositoryListContainer repositories={repositories} />
        </NativeRouter>
      );

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const checkRepositoryItemText = (item, testData) => {
        expect(item).toHaveTextContent(testData.fullName);
        expect(item).toHaveTextContent(testData.description);
        expect(item).toHaveTextContent(testData.language);
        expect(item).toHaveTextContent(
          numberToStatDisplayFigure(testData.forksCount)
        );
        expect(item).toHaveTextContent(
          numberToStatDisplayFigure(testData.stargazersCount)
        );
        expect(item).toHaveTextContent(testData.ratingAverage);
        expect(item).toHaveTextContent(testData.reviewCount);
      };

      checkRepositoryItemText(firstRepositoryItem, repositories.edges[0].node);
      checkRepositoryItemText(secondRepositoryItem, repositories.edges[1].node);
    });
  });
});
