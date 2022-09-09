import React, { useEffect, useState } from "react";
import noteImage from "../../assets/images/notes.png";
import plusImage from "../../assets/images/plus.png";
import { useAddTodoMutation } from "../../features/api/apiSlice";
import { errorMsg, successMsg } from "../../utils/notifications";

const AddTodoForm = () => {
    const [addTodo, { isLoading, isError, isSuccess }] = useAddTodoMutation();
    const [title, setTitle] = useState("");

    useEffect(() => {
        //error message
        if (!isSuccess && isError) {
            errorMsg("Error adding new todo!");
        }

        //success message
        if (!isError && isSuccess) {
            successMsg("Todo added successfully.");
        }
    }, [isSuccess, isError]);

    const handleAddTodo = (e) => {
        e.preventDefault();
        addTodo({
            text: title,
            completed: false,
            color: "",
        });
        setTitle("");
    };

    return (
        <form
            onSubmit={handleAddTodo}
            className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        >
            <img src={noteImage} className="w-6 h-6" alt="Add todo" />
            <input
                type="text"
                placeholder="Type your todo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
            />
            <button
                disabled={isLoading}
                type="submit"
                className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
            ></button>
        </form>
    );
};

export default AddTodoForm;
