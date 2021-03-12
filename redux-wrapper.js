import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getPersistor, getStore } from "./src/redux/store";

const Wrapper = ({ element }) => {
    const store = getStore();
    const persistor = getPersistor(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {element}
            </PersistGate>
        </Provider>
    );
};

export default Wrapper;
