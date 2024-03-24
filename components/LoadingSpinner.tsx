const LoadingSpinner = ({text}: {text: string | null}) => {

    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full border-t-4 border-gray-700 border-solid h-12 w-12"></div>
            <span className="ml-2 text-gray-700">{text ? text : "Läser in..."}</span>
        </div>
    );
};

export default LoadingSpinner;
