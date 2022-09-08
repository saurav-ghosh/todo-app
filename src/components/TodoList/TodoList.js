import React from "react";
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../../features/api/apiSlice";
import Error from "../Ui/Error";
import TodoLoader from "../Ui/Loaders/TodoLoader";
import Todo from "./Todo";

const TodoList = () => {
    const { data: todos, isLoading, isError } = useGetTodosQuery();
    const { status, colors } = useSelector((state) => state.filters);

    //filter by status
    const filterByStatus = (todo) => {
        if (status === "all") {
            return true;
        } else if (status === "complete") {
            return todo.completed;
        } else {
            return !todo.completed;
        }
    };

    //filter by colors
    const filterByColor = (todo) => {
        if (colors.length > 0) return colors.includes(todo?.color);

        return true;
    };

    //decide what to render
    let content = null;
    if (isLoading)
        content = (
            <>
                <TodoLoader />
                <TodoLoader />
                <TodoLoader />
                <TodoLoader />
            </>
        );

    if (!isLoading && isError)
        content = <Error message="There was an error ocurred!" />;

    if (!isLoading && !isError && todos?.length === 0)
        content = <Error message="No todos found!" />;

    if (!isLoading && !isError && todos?.length > 0)
        content = todos
            ?.filter(filterByStatus)
            ?.filter(filterByColor)
            ?.map((todo) => <Todo key={todo.id} todo={todo} />);

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {content}
        </div>
    );
};

export default TodoList;
