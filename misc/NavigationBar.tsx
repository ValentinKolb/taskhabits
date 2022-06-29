import {Appbar, Menu} from 'react-native-paper';
import {useState} from "react";

export default function ({navigation}: any) {

    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Appbar.Header>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action icon="menu" onPress={openMenu}/>
                }>
                <Menu.Item onPress={() => {
                    closeMenu()
                    navigation.navigate("Home")
                }} title="Home"/>
                <Menu.Item onPress={() => {
                    closeMenu()
                    navigation.navigate("CreateTask")
                }} title="New Task"/>
            </Menu>

            <Appbar.Content title={navigation.getState().index == 1? "Create new Task" : "Task Habits"}/>
        </Appbar.Header>
    );
}