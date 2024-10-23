

// //App.tsx



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import ProductsScreen from './components/ProductsScreen';
// import ProductDetailsScreen from './components/ProductDetailsScreen';
// import { Product } from './types';

// export type RootStackParamList = {
//   Products: undefined;
//   ProductDetails: { product: Product };
// };

// const Stack = createStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Products">
//         <Stack.Screen name="Products" component={ProductsScreen} />
//         <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }





// //App.tsx:
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SurahListScreen from '../demoProject/components/SurahListScreen';
// import SurahDetailsScreen from '../demoProject/components/SurahDetailsScreen';
// import { Surah } from './types';

// export type RootStackParamList = {
//   SurahList: undefined;
//   SurahDetails: { surah: Surah };
// };

// const Stack = createStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SurahList">
//         <Stack.Screen
//           name="SurahList"
//           component={SurahListScreen}
//           options={{ headerShown: false }} // Remove the header
//         />
//         <Stack.Screen name="SurahDetails" component={SurahDetailsScreen} />
//         {/* error in component */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }





import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SurahListScreen from '../demoProject/components/SurahListScreen';

export type RootStackParamList = {
  SurahList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SurahList">
        <Stack.Screen
          name="SurahList"
          component={SurahListScreen}
          options={{ headerShown: false }} // Remove the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
