import React, { useEffect } from "react";
import tickImage from "../../assets/images/double-tick.png";
import {
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from "../../features/api/apiSlice";
import { errorMsg, successMsg } from "../../utils/notifications";
import Spinner from "../Ui/Spinner";
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

    // side effect for updating all todos
    useEffect(() => {
        //error message
        if (!isSuccess && isError) {
            errorMsg("Error updating all todos!");
        }

        //success message
        if (!isError && isSuccess) {
            successMsg("All todos updated successfully.");
        }
    }, [isSuccess, isError]);

    // side effect for deleting completed todos
    useEffect(() => {
        //error message
        if (!deleteTodoIsSuccess && deleteTodoIsError) {
            errorMsg("Error deleting completed todos!");
        }

        //success message
        if (!deleteTodoIsError && deleteTodoIsSuccess) {
            successMsg("Completed todos deleted successfully.");
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
                        <Spinner />
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
                        <Spinner />
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
