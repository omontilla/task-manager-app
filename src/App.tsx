import {Refine} from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    useNotificationProvider,
} from "@refinedev/chakra-ui";
import {ChakraProvider} from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router";
import {BrowserRouter, Routes, Route, Outlet} from "react-router";

import {TaskList, TaskCreate, TaskEdit, TaskShow} from "./pages";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";

const API_URL = "https://task-manager-core-production.up.railway.app";
//const API_URL = "http://localhost:3000"

const App: React.FC = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <ChakraProvider theme={RefineThemes.Purple}>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(API_URL)}
                        notificationProvider={useNotificationProvider}
                        resources={[
                            {
                                name: "api/tasks",
                                list: "/task",
                                create: "/task/create",
                                edit: "/task/:id",
                                show: "/task/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route>
                                <Route index element={<NavigateToResource resource="task"/>}/>

                                <Route path="/task">
                                    <Route index element={<TaskList/>}/>
                                    <Route path="create" element={<TaskCreate/>}/>
                                    <Route path=":id" element={<TaskEdit/>}/>
                                    <Route path="show/:id" element={<TaskShow/>}/>
                                </Route>

                                <Route path="*" element={<ErrorComponent/>}/>
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier/>
                        <DocumentTitleHandler/>
                    </Refine>
                </ChakraProvider>
            </BrowserRouter>
        </I18nextProvider>
    );
};

export default App;
