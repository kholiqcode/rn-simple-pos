import React from 'react';
import {FlatList, type FlatListProps, type ListRenderItem} from 'react-native';

import {Box, Gap} from '@components/atoms';
import CategoryBadge from '@features/sales/components/CategoryBadge';
import {type Category} from '@features/sales/types/category';

type CategoryBadgeListProps<T> = {
  data: T[];
  onCategorySelected?: (id: number) => void;
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>;

export default React.memo(function CategoryBadgeList(
  props: CategoryBadgeListProps<Category>,
): JSX.Element {
  const {data, onCategorySelected, ...baseProps} = props;
  const [selectedCategory, setSelectedCategory] = React.useState(1);

  const handleCategoryPress = React.useCallback(
    (id: number) => {
      setSelectedCategory(id);
      if (onCategorySelected != null) {
        onCategorySelected(id);
      }
    },
    [setSelectedCategory, onCategorySelected],
  );

  const renderItem: ListRenderItem<Category> = ({item}) => (
    <CategoryBadge
      iconName={item.iconName}
      isSelected={selectedCategory === item.id}
      onPress={() => {
        handleCategoryPress(item.id);
      }}
    />
  );

  return (
    <Box>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id.toString()}_${item.name}`}
        ItemSeparatorComponent={() => <Gap width={12} />}
        renderItem={renderItem}
        {...baseProps}
      />
    </Box>
  );
});
