import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';
import {
  Button,
  Icon,
  Menu,
  Modal,
  PaperProvider,
  Portal,
} from 'react-native-paper';
import { useState } from 'react';
import Text from './Text';

const styles = StyleSheet.create({
  sortStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    height: 60,
  },
  menu: {
    backgroundColor: 'white',
    margin: 15,
  },
});

const ListSortSelect = ({ setSortOrder, sortOrder }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  let anchorText = '';

  switch (sortOrder) {
    case 'LATEST':
      anchorText = 'Latest repositories';
      break;
    case 'HIGHEST_RATED':
      anchorText = 'Highest rated repositories';
      break;
    case 'LOWEST_RATED':
      anchorText = 'Lowest rated repositories';
      break;
    default:
      anchorText = 'Sort by...';
  }

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Pressable onPress={openMenu} onDismiss={closeMenu}>
            <View style={styles.sortStyle}>
              <Text fontSize="subheading">{anchorText}</Text>
              <Icon source="menu-down" size={20} />
            </View>
          </Pressable>
        }
      >
        <Portal>
          <Modal visible={visible} onDismiss={closeMenu}>
            <View style={styles.menu}>
              <Menu.Item title="Select an item..." disabled />
              <Menu.Item
                onPress={() => {
                  setSortOrder('LATEST');
                  closeMenu();
                }}
                title="Latest repositories"
              />
              <Menu.Item
                onPress={() => {
                  setSortOrder('HIGHEST_RATED');
                  closeMenu();
                }}
                title="Highest rated repositories"
              />
              <Menu.Item
                onPress={() => {
                  setSortOrder('LOWEST_RATED');
                  closeMenu();
                }}
                title="Lowest rated repositories"
              />
            </View>
          </Modal>
        </Portal>
      </Menu>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setSortOrder,
  sortOrder,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <PaperProvider>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <ListSortSelect setSortOrder={setSortOrder} sortOrder={sortOrder} />
        )}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => navigate(`/${item.id}`)}>
              <RepositoryItem repository={item} />
            </Pressable>
          );
        }}
      />
    </PaperProvider>
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState('LATEST');
  const { repositories } = useRepositories(sortOrder);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
  );
};

export default RepositoryList;
