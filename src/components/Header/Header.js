import React, { useEffect } from "react";
import { toast } from "react-toastify";
import tickImage from "../../assets/images/double-tick.png";
import {
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from "../../features/api/apiSlice";
import AddTodoForm from "./AddTodoForm";

const Header = () => {
    const {
        data: todos,
        isLoading: todosIsLoading,
        isError: todosIsError,
    } = useGetTodosQuery();
    const [
        deleteTodo,
        {
            isLoading: deleteTodoIsLoading,
            isError: deleteTodoIsError,
            isSuccess: deleteTodoIsSuccess,
        },
    ] = useDeleteTodoMutation();
    const [updateTodo, { isLoading, isSuccess, isError }] =
        useUpdateTodoMutation();

    useEffect(() => {
        if (!isSuccess && isError) {
            toast.error("Error updating all todos!", {
                position: "top-center",
                autoClose: 2000,
            });
        }

        if (!isError && isSuccess) {
            toast.success("All todos updated successfully.", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        if (!deleteTodoIsSuccess && deleteTodoIsError) {
            toast.error("Error deleting all todos!", {
                position: "top-center",
                autoClose: 2000,
            });
        }

        if (!deleteTodoIsError && deleteTodoIsSuccess) {
            toast.success("All todos deleted successfully.", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }, [deleteTodoIsError, deleteTodoIsSuccess]);

    //complete all todos
    const handleCompleteAllTodos = () => {
        if (!todosIsLoading && !todosIsError && todos?.length > 0) {
            todos.forEach(
                async (todo) =>
                    await updateTodo({
                        id: todo.id,
                        data: {
                            completed: true,
                        },
                    })
            );
        }
    };

    //delete all todos
    const handleDeleteAllTodos = () => {
        if (!todosIsLoading && !todosIsError && todos?.length > 0) {
            todos.forEach(async (todo) => {
                if (todo.completed === true) {
                    await deleteTodo(todo.id);
                }
            });
        }
    };

    return (
        <div>
            <AddTodoForm />

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                {isLoading ? (
                    <li className="flex space-x-1 ">
                        <svg
                            className="mr-3 h-4 w-4 animate-spin text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span className="font-medium"> Processing... </span>
                    </li>
                ) : (
                    <li
                        onClick={handleCompleteAllTodos}
                        className="flex space-x-1 cursor-pointer"
                    >
                        <img
                            className="w-4 h-4"
                            src={tickImage}
                            alt="Complete"
                        />
                        <span>Complete All Tasks</span>
                    </li>
                )}
                {deleteTodoIsLoading ? (
                    <li className="flex space-x-1">
                        <svg
                            className="mr-3 h-4 w-4 animate-spin text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span className="font-medium"> Processing... </span>
                    </li>
                ) : (
                    <li
                        onClick={handleDeleteAllTodos}
                        className="cursor-pointer"
                    >
                        Clear completed
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Header;
