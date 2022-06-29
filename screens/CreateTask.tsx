import {View} from "react-native";
import * as React from "react";
import {Button, RadioButton, Switch, Text, TextInput} from "react-native-paper";
import {useState} from "react"
import {useStoreActions} from "../misc/Store";

export function TaskScreen({navigation}: any) {

    const [title, setTitle] = useState("");
    const [days, setDays] = useState<number[]>([]);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [desc, setDesc] = useState("");

    const addTask = useStoreActions(actions => actions.addTask)

    const DayButton = function ({day}: { day: number }) {
        return <RadioButton.Android
            value={`${day}`}
            status={days.includes(day) ? "checked" : "unchecked"}
            onPress={() => {
                if (days.includes(day)) {
                    setIsSwitchOn(false)
                    setDays(d => d.filter(d => d != day))
                } else {
                    setDays([day, ...days])
                }
            }}
        />
    }

    return (
        <View style={{padding: 10}}>
            <TextInput
                style={{marginTop: 10}}
                label="Name your task ..."
                value={title}
                onChangeText={text => setTitle(text)}
            />

            <View style={{flexDirection: "row", paddingTop: 10, justifyContent: "space-between"}}>
                <DayButton day={1}/>
                <DayButton day={2}/>
                <DayButton day={3}/>
                <DayButton day={4}/>
                <DayButton day={5}/>
                <DayButton day={6}/>
                <DayButton day={0}/>
            </View>

            <View style={{flexDirection: "row", paddingHorizontal: 5, paddingTop: 10, justifyContent: "space-between"}}>
                <Text>Mon</Text>
                <Text>Tue</Text>
                <Text>Wed</Text>
                <Text>Thu</Text>
                <Text>Fri</Text>
                <Text>Sat</Text>
                <Text>Sun</Text>
            </View>

            <View style={{flexDirection: "row", paddingHorizontal: 5, paddingTop: 10, alignItems: "center"}}>
                <Switch value={isSwitchOn} onValueChange={() => {
                    setIsSwitchOn(b => !b)
                    setDays(isSwitchOn ? [] : [0, 1, 2, 3, 4, 5, 6])
                }}/>
                <Text>Everyday</Text>
            </View>

            <TextInput
                multiline
                numberOfLines={6}
                style={{marginTop: 10}}
                label="Describe your task ..."
                value={desc}
                onChangeText={text => setDesc(text)}
            />

            <View style={{paddingTop: 10}}>
                <Button
                    mode={"contained"}
                    disabled={!(title != "" && desc != "" && days != [])}
                    onPress={() => {
                        addTask({
                            id: Math.random().toString(),
                            title: title,
                            description: desc,
                            completed_for: [],
                            weekdays: days,
                            love: false
                        })
                        navigation.navigate("Home")
                    }}
                >
                    Create
                </Button>
            </View>
        </View>
    );
}