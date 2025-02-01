
import React from 'react';
import AuthStore from './authStore';
import UIStore from './uiStore';

const authStore = new AuthStore();
const uiStore = new UIStore();

export default React.createContext({ authStore, uiStore });
