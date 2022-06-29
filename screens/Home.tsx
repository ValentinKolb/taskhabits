import {View, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {
    Checkbox,
    DataTable,
    Dialog,
    IconButton,
    Paragraph,
    Portal,
    Text,
    Button,
    AnimatedFAB, Chip
} from 'react-native-paper';
import * as React from "react";
import {Calendar} from "react-native-calendars/src";
import {useState} from "react";
import {Task, useStoreActions, useStoreState} from "../misc/Store";

const DisplayTasks = function ({love, selectedDay}: { love: boolean, selectedDay: string }) {

    const tasks = useStoreState(state => love ? state.tasks.filter(t => t.love) : state.tasks.filter(t => !t.love));

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task>()

    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [taskForInfo, setTaskForInfo] = useState<Task>()

    const toggleTask = useStoreActions(actions => actions.toggleTask)
    const toggleLove = useStoreActions(actions => actions.toggleLoveTask)
    const deleteTask = useStoreActions(actions => actions.deleteTask)

    const displayTask = function (task: Task) {
        const day = new Date(selectedDay).getDay()
        return task.weekdays.includes(day)
    }

    return <>

        <Portal>
            {/* confirmation dialog for deleting task */}
            <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
                <Dialog.Title>Confirmation</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Are you sure you want to delete "{taskToDelete?.title}"?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
                    <Button onPress={() => {
                        if (taskToDelete) deleteTask(taskToDelete)
                        setShowDeleteDialog(false)
                    }}>Delete</Button>
                </Dialog.Actions>
            </Dialog>


            {/* Task Info Dialog */}
            <Dialog visible={showInfoDialog} onDismiss={() => setShowInfoDialog(false)}>
                <Dialog.Title>Task Info</Dialog.Title>
                <Dialog.Content>
                    <Chip icon="information">This Task was finished {taskForInfo?.completed_for.length} times</Chip>
                    <Paragraph>{taskForInfo?.description}</Paragraph>
                </Dialog.Content>
            </Dialog>
        </Portal>

        {/* list all tasks */}
        {tasks
            .sort((a, b) => a.title < b.title ? 1 : -1)
            .filter(task => displayTask(task))
            .map((task) => {

                return <DataTable.Row key={task.id}>
                    <DataTable.Cell>
                        <Checkbox.Android
                            status={task.completed_for.includes(selectedDay) ? "checked" : "unchecked"}
                            onPress={() => toggleTask({task: task, weekday: selectedDay})}
                        />
                        <IconButton
                            icon="heart"
                            iconColor={task.love ? "red" : "black"}
                            size={20}
                            onPress={() => toggleLove(task)}
                        />
                    </DataTable.Cell>

                    <DataTable.Cell>
                        <Text onPress={
                            () => {
                                setTaskForInfo(task)
                                setShowInfoDialog(true)
                            }
                        }
                        >{task.title}</Text>
                    </DataTable.Cell>

                    <DataTable.Cell numeric>
                        <IconButton
                            icon="delete"
                            size={20}
                            onPress={() => {
                                setTaskToDelete(task)
                                setShowDeleteDialog(true)
                            }}
                        />
                    </DataTable.Cell>
                </DataTable.Row>
            })}</>
}

export function HomeScreen({navigation}: any) {

    const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().slice(0, 10))

    return (
        <View style={{padding: 10, flexGrow: 1}}>
            <SafeAreaView>
                <ScrollView>
                    <Calendar
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={day => {
                            setSelectedDay(day.dateString)
                        }}
                        monthFormat={'MMMM yyyy'}
                        firstDay={1}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        markedDates={{
                            [selectedDay]: {selected: true}
                        }}
                    />
                    <DataTable>
                        <DisplayTasks love={true} selectedDay={selectedDay}/>
                        <DisplayTasks love={false} selectedDay={selectedDay}/>
                    </DataTable>
                </ScrollView>
            </SafeAreaView>

            <AnimatedFAB
                icon={'plus'}
                label={'New Task'}
                extended={false}
                onPress={() => navigation.navigate("CreateTask")}
                visible={true}
                animateFrom={'right'}
                iconMode={'static'}
                style={[styles.fabStyle]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});