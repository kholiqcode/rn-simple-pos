/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useEffect} from 'react';
import {FlatList, type ListRenderItem} from 'react-native';

import {t as _} from 'i18next';

import {Gap} from '@components/atoms';
import {BaseLayout} from '@components/layouts';
import {
  useProductActions,
  useProductInBasketTotalPrice,
  useProductsInBasket,
  useProductsInBasketCount,
} from '@features/sales/store/product';
import {type ProductInBasket} from '@features/sales/types/product';
import {RouteNames} from '@navigation/routes';
import {type OrderScreenProps} from '@navigation/types/app';

import {FloatingOrderButton, ProductBasketCard} from '../components';
import useReceipt from '../hooks/useReceipt';

export default function OrderScreen(props: OrderScreenProps): JSX.Element {
  const {navigation} = props;
  const {resetAllProductsInBasket} = useProductActions();
  const productInBasket = useProductsInBasket();
  const productInBasketCount = useProductsInBasketCount();
  const productInBasketTotalPrice = useProductInBasketTotalPrice();
  const {printReceipt} = useReceipt(productInBasket);

  const renderItem: ListRenderItem<ProductInBasket> = ({item}) => (
    <ProductBasketCard item={item} />
  );

  const handlePayNow = async (): Promise<void> => {
    try {
      await printReceipt();
      resetAllProductsInBasket();
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (productInBasketCount === 0) {
      navigation.navigate(RouteNames.SalesScreen);
    }
  }, [productInBasketCount]);

  return (
    <BaseLayout flex={1}>
      <FlatList
        data={productInBasket}
        keyExtractor={item =>
          `${item.product.id.toString()}_${item.product.name}_${item.quantity}`
        }
        ItemSeparatorComponent={() => <Gap height={10} />}
        renderItem={renderItem}
      />
      <FloatingOrderButton
        title={_('pay_now')}
        price={productInBasketTotalPrice}
        onPress={handlePayNow}
      />
    </BaseLayout>
  );
}