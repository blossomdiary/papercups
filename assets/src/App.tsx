import React, {useEffect} from 'react';
import {
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {useAuth} from './components/auth/AuthProvider';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EmailVerification from './components/auth/EmailVerification';
import PasswordReset from './components/auth/PasswordReset';
import RequestPasswordReset from './components/auth/RequestPasswordReset';
import PasswordResetRequested from './components/auth/PasswordResetRequested';
import Demo from './components/demo/Demo';
import BotDemo from './components/demo/BotDemo';
import Dashboard from './components/Dashboard';
import Sandbox from './components/Sandbox';
import SharedConversation from './components/conversations/SharedConversation';
import {BRAND_COLOR} from './config';
import './App.css';

// Helper function to generate color variations
const hexToRgb = (hex: string): {r: number; g: number; b: number} | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const lighten = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * percent));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * percent));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * percent));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const darken = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.max(0, Math.round(rgb.r * (1 - percent)));
  const g = Math.max(0, Math.round(rgb.g * (1 - percent)));
  const b = Math.max(0, Math.round(rgb.b * (1 - percent)));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const App = () => {
  const auth = useAuth();

  // Set CSS variables for brand color on mount
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = 'dynamic-styles';
    styleElement.innerHTML = `
      :root {
        --brand-color: ${BRAND_COLOR} !important;
        --brand-color-hover: ${lighten(BRAND_COLOR, 0.2)} !important;
        --brand-color-active: ${darken(BRAND_COLOR, 0.2)} !important;
        --brand-color-light: ${lighten(BRAND_COLOR, 0.7)} !important;
        --brand-color-lighter: ${lighten(BRAND_COLOR, 0.5)} !important;
        --brand-color-dark: ${darken(BRAND_COLOR, 0.92)} !important;
        --brand-color-darker: ${darken(BRAND_COLOR, 0.87)} !important;
      }
    `;
    document.head.appendChild(styleElement);
  }, []);

  if (auth.loading) {
    return null; // FIXME: show loading icon
  }

  if (!auth.isAuthenticated) {
    // Public routes
    return (
      <Router>
        <Switch>
          <Route path="/demo" component={Demo} />
          <Route path="/bot/demo" component={BotDemo} />
          <Route path="/login" component={Login} />
          <Route path="/register/:invite" component={Register} />
          <Route path="/register" component={Register} />
          <Route path="/verify" component={EmailVerification} />
          <Route path="/reset-password" component={RequestPasswordReset} />
          <Route path="/reset" component={PasswordReset} />
          <Route
            path="/reset-password-requested"
            component={PasswordResetRequested}
          />
          <Route path="/sandbox" component={Sandbox} />
          <Route path="/share" component={SharedConversation} />
          <Route
            path="*"
            render={(props: RouteComponentProps<{}>) => (
              <Redirect to={`/login?redirect=${props.location.pathname}`} />
            )}
          />
        </Switch>
      </Router>
    );
  }

  // Private routes
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register/:invite" component={Register} />
        <Route path="/register" component={Register} />
        <Route path="/verify" component={EmailVerification} />
        <Route path="/reset-password" component={RequestPasswordReset} />
        <Route path="/reset" component={PasswordReset} />
        <Route
          path="/reset-password-requested"
          component={PasswordResetRequested}
        />
        <Route path="/demo" component={Demo} />
        <Route path="/bot/demo" component={BotDemo} />
        <Route path="/sandbox" component={Sandbox} />
        <Route path="/share" component={SharedConversation} />
        <Route path="/" component={Dashboard} />
        <Route path="*" render={() => <Redirect to="/conversations" />} />
      </Switch>
    </Router>
  );
};

export default App;
