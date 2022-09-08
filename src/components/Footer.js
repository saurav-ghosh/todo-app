import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import { setColors, setStatus } from "../features/filters/filterSlice";

const Footer = () => {
    const { data: todos } = useGetTodosQuery();
    const { status, colors } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    // count incomplete todos
    const countIncompleteTodos = todos?.reduce(
        (prevTodo, currTodo) => prevTodo + !currTodo?.completed,
        0
    );

    //decide what to render
    let content = "Tasks";
    if (countIncompleteTodos === 0) content = "No Task";
    if (countIncompleteTodos === 1) content = "Task";
    if (countIncompleteTodos > 1) content = "Tasks";

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>
                {countIncompleteTodos !== 0 && countIncompleteTodos} {content}{" "}
                left
            </p>

            <ul className="flex space-x-1 items-center text-xs">
                <li
                    className={`cursor-pointer ${
                        status === "all" && "font-bold"
                    }`}
                    onClick={() => dispatch(setStatus("all"))}
                >
                    All
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "incomplete" && "font-bold"
                    }`}
                    onClick={() => dispatch(setStatus("incomplete"))}
                >
                    Incomplete
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "complete" && "font-bold"
                    }`}
                    onClick={() => dispatch(setStatus("complete"))}
                >
                    Complete
                </li>
                <li></li>
                <li></li>
                <li
                    onClick={() => dispatch(setColors("green"))}
                    className={`${
                        colors?.includes("green") && "bg-green-500"
                    } h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer`}
                ></li>
                <li
                    onClick={() => dispatch(setColors("red"))}
                    className={`${
                        colors?.includes("red") && "bg-red-500"
                    } h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer`}
                ></li>
                <li
                    onClick={() => dispatch(setColors("yellow"))}
                    className={`${
                        colors?.includes("yellow") && "bg-yellow-500"
                    } h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer`}
                ></li>
            </ul>
        </div>
    );
};

export default Footer;
