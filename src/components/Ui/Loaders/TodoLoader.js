import React from "react";

const TodoLoader = () => {
    return (
        <div className="animate-pulse flex items-center space-x-4 p-2">
            <div className="rounded-full h-5 w-5 bg-slate-200"></div>
            <div className="flex-1 h-3 bg-slate-200 rounded"></div>
            <div className="flex-shrink-0 bg-slate-200 h-4 w-4 rounded-full ml-auto"></div>
            <div className="flex-shrink-0 bg-slate-200 h-4 w-4 rounded-full ml-auto"></div>
            <div className="flex-shrink-0 bg-slate-200 h-4 w-4 rounded-full ml-auto"></div>
            <div className="flex-shrink-0 bg-slate-200 h-4 w-4 rounded-full ml-auto"></div>
            <div className="flex-shrink-0 bg-slate-200 h-4 w-4 rounded-full ml-auto"></div>
        </div>
    );
};

export default TodoLoader;
