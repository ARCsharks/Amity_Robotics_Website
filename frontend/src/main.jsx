import { StrictMode, Component, captureOwnerStack } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function logErrorToMyService(error, componentStack, ownerStack) {
  // Log the error to an error reporting service
  console.error("Logged error:", { error, componentStack, ownerStack });

}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }

  }

  static getDerivedStateFromError(error) {
    return { hasError: true }

  }

  componentDidCatch(error, info) {
    logErrorToMyService(
      error,
      info.componentStack,
      captureOwnerStack(),

    );

  } 

  render() {
    if (this.state.hasError) {
      return this.props.fallback;

    }

    return this.props.children;

  }

}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <StrictMode>
      <App />
    </StrictMode>
  </ErrorBoundary>
)
