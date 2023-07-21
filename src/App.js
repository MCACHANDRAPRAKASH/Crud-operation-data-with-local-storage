import React, { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


//to get the data from LS

const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    console.log(list);

    if (list) {

        return JSON.parse(localStorage.getItem("lists"));
    } else {
        return [];
    }

}


const App = () => {
    const [inputData, setInputData] = useState("");
    const [Items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const addItems = () => {

        if (!inputData) {
            alert("Plz fill data");
        } else if (inputData && !toggleSubmit) {

            setItems(
                Items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )

            setToggleSubmit(true);

            setInputData("");

            setIsEditItem(null);


        } else {

            const allInputdata = { id: new Date().getTime().toString(), name: inputData }
            setItems([...Items, allInputdata]);
            setInputData("");

        }
    }


    //edit the items
    const editItem = (id) => {
        let newEditItem = Items.find((elem) => {
            return elem.id === id;

        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);


    }


    //delete the items
    const delateItem = (index) => {

        const updateitems = Items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateitems);
    }

    const removeAll = () => {
        setItems([]);
    }

    //add data to localStorage
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(Items))
    }, [Items]);

    return (
        <>

            <div className="main_div">
                <div className="center_div">




                    <div className="addItems">
                        <h1> ToDo List</h1>
                        <input type="text" placeholder="Add a Items..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ? <span onClick={addItems} title="Add Item" className="btn_green">
                                <AddIcon />  </span> : <span onClick={addItems} title="Update Item" className="btn_green">
                                <EditIcon /> ;
                            </span>
                        }
                    </div>

                    <div className="showItems">
                        <button className="btn_div" onClick={removeAll}><span>removeAll</span></button>
                    </div>

                    <div className="showItems">

                        {
                            Items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="btn_red">

                                            <span onClick={() => editItem(elem.id)} className="btn_edit">
                                                <EditIcon />
                                            </span>

                                            <i onClick={() => delateItem(elem.id)} className="btn_del">



                                                <DeleteIcon />
                                            </i>
                                        </div>

                                    </div>

                                )
                            })
                        }

                    </div>
                    



                </div>

            </div>
        </>
    );
};

export default App;
