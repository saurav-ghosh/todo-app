import React, { useEffect, useState } from "react";
import cancelImage from "../../assets/images/cancel.png";
import {
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from "../../features/api/apiSlice";
import { errorMsg, successMsg } from "../../utils/notifications";

const Todo = ({ todo }) => {
    const { text, completed, color, id } = todo || {};
    const [
        updateTodo,
        { isError: isErrorUpdating, isSuccess: isSuccessUpdating },
    ] = useUpdateTodoMutation();
    const [deleteTodo, { isError, isSuccess }] = useDeleteTodoMutation();
    const [updateTitle, setUpdateTitle] = useState(false);
    const [title, setTitle] = useState(text);

    // side effect for delete todo
    useEffect(() => {
        //error & success msg for delete todo
        if (!isSuccess && isError) {
            errorMsg("Error deleting todo!");
        }

        if (!isError && isSuccess) {
            successMsg("Todo deleted successfully.");
        }
    }, [isSuccess, isError]);

    // side effect for update todo
    useEffect(() => {
        //error & success msg for update todo
        if (!isSuccessUpdating && isErrorUpdating) {
            errorMsg("Error updating todo!");
        }

        if (!isErrorUpdating && isSuccessUpdating) {
            successMsg("Todo updated successfully.");
        }
    }, [isSuccessUpdating, isErrorUpdating]);

    //updating status
    const handleUpdateStatus = () => {
        updateTodo({
            id,
            data: { completed: !completed },
        });
    };

    //updating color
    const handleUpdateColor = (color) => {
        updateTodo({
            id,
            data: { color },
        });
    };

    //updating title
    const handleUpdateTitle = async (e) => {
        e.preventDefault();
        await updateTodo({
            id,
            data: {
                text: title,
            },
        });
        setUpdateTitle(false);
    };

    //deleting todo
    const handleDeleteTodo = (id) => {
        deleteTodo(id);
    };

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`${
                    completed
                        ? "border-green-500 focus-within:border-green-500"
                        : "border-gray-400"
                } hover:border-green-500 hover:transition relative rounded-full bg-white border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 `}
            >
                <input
                    checked={completed}
                    onChange={handleUpdateStatus}
                    type="checkbox"
                    className="opacity-0 absolute rounded-full"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            {updateTitle ? (
                <div className="flex-1">
                    <form onSubmit={handleUpdateTitle}>
                        <input
                            autoFocus
                            className="outline-none w-[90%]"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </form>
                </div>
            ) : (
                <div
                    className={`select-none flex-1 ${
                        completed && "line-through"
                    }`}
                >
                    {text}
                </div>
            )}

            <div
                onClick={() => handleUpdateColor("green")}
                className={`${
                    color === "green" && "bg-green-500"
                } flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500`}
            ></div>

            <div
                onClick={() => handleUpdateColor("yellow")}
                className={`${
                    color === "yellow" && "bg-yellow-500"
                } flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500`}
            ></div>

            <div
                onClick={() => handleUpdateColor("red")}
                className={`${
                    color === "red" && "bg-red-500"
                } flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500`}
            ></div>
            <span
                onClick={() => setUpdateTitle(true)}
                className="material-symbols-outlined cursor-pointer"
            >
                edit
            </span>

            <img
                onClick={() => handleDeleteTodo(id)}
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
            />
        </div>
    );
};

export default Todo;
