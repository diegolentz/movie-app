import { CircularProgress } from "@mui/material";
import { createContext, useContext, useState } from "react";
import './useLoader.css';

type LoaderContextType = {
    loaderInvoke: (loading: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType>({
    loaderInvoke: () => {}
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  	const [isLoading, setIsLoading] = useState(false);

    const loaderInvoke = (loading: boolean) => {
        (loading) ? setIsLoading(loading) : setTimeout(() => setIsLoading(loading), 500);
    }

  	return (
		<LoaderContext.Provider value={{ loaderInvoke }}>
			{isLoading && (
                <div className="loader">
                 <CircularProgress color="inherit" size={64} />
                </div>
			)}
			{children}
			</LoaderContext.Provider>
	);
};
