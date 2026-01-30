import { motion } from "framer-motion";
import React, { type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): State{
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Все упало:", error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError){
            return this.props.fallback || (<motion.div className="techDiff" drag dragConstraints={{top:0,left:0,right:0,bottom:0}} transition={{ type: 'spring', stiffness: 50 }}>
                <div></div>
                <h2>С этой частью сайта произошли технические неполадки. Ожидайте фикс</h2>
            </motion.div>)
        }
        return this.props.children;
    }
}

export default ErrorBoundary