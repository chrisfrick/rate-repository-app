import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  avatarContainer: {
    paddingRight: 15,
    flexGrow: 0,
  },
  infoContainer: {
    flexGrow: 1,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

const CardHeader = ({ ownerAvatarUrl, fullName, description, language }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image
          style={cardHeaderStyles.avatar}
          source={{ uri: ownerAvatarUrl }}
        />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold">{fullName}</Text>
        <Text color="textSecondary" style={{ marginTop: 5 }}>
          {description}
        </Text>
        <View style={cardHeaderStyles.languageTag}>
          <Text color="white" fontSize="subheading">
            {language}
          </Text>
        </View>
      </View>
    </View>
  );
};

const repositoryStatsStyles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const StatItem = ({ number, label }) => {
  return (
    <View>
      <Text style={{ textAlign: 'center', marginTop: 15 }} fontWeight="bold">
        {Number(number) >= 1000
          ? `${Math.round((Number(number) / 1000) * 10) / 10}k`
          : number}
      </Text>
      <Text style={{ textAlign: 'center', marginTop: 5 }} color="textSecondary">
        {label}
      </Text>
    </View>
  );
};

const RepositoryStats = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={repositoryStatsStyles.statsContainer}>
      <StatItem number={stars} label="Stars" />
      <StatItem number={forks} label="Forks" />
      <StatItem number={reviews} label="Reviews" />
      <StatItem number={rating} label="Rating" />
    </View>
  );
};

const cardStyles = StyleSheet.create({
  repositoryItemContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={cardStyles.repositoryItemContainer}>
      <CardHeader
        ownerAvatarUrl={repository.ownerAvatarUrl}
        fullName={repository.fullName}
        description={repository.description}
        language={repository.language}
      ></CardHeader>
      <RepositoryStats
        stars={repository.stargazersCount}
        forks={repository.forksCount}
        reviews={repository.reviewCount}
        rating={repository.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
