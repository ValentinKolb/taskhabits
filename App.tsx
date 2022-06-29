import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {HomeScreen} from "./screens/Home";
import {TaskScreen} from "./screens/CreateTask";
import NavigationBar from "./misc/NavigationBar";
import {StoreProvider} from "easy-peasy";
import {store} from "./misc/Store";
import {MD3Colors} from "react-native-paper/lib/typescript/types";

const Stack = createNativeStackNavigator();

DefaultTheme.colors as MD3Colors

function App() {
    return (
        <PaperProvider theme={{
            ...DefaultTheme,
        }}>
            <StoreProvider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            header: (props) => <NavigationBar {...props} />,
                        }}
                    >
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="CreateTask" component={TaskScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </StoreProvider>
        </PaperProvider>
    );
}

export default App;
