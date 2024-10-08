import { useEffect, useState } from "react"

export const AutoSearch = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const [filteredUser, setFilteredUser] = useState([])
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchParam(query);
        // console.log(query);

        if(query.length > 1){
            const filterData = 
                user && user.length 
                ? user.filter((item) => item.toLowerCase().indexOf(query) > -1)
                : [];
            
            setFilteredUser(filterData);
            setShowDropdown(true)            
        }else{
            setShowDropdown(false)
        }
    }

    function handleClick(event){
        setShowDropdown(false)
        setSearchParam(event.target.innerText)
        setFilteredUser([])
      }

    const fetchAutoSearch = async () => {
        try {
            // loading(true);
            const res = await fetch ("https://dummyjson.com/users");
            const data = await res.json();
            // console.log(data.users.forEach(curr => console.log(curr.firstName)))
            
            if(data && data.users && data.users.length){
                setUser(data.users.map((element) => element.firstName))
                setLoading(false)
                setError(null)
            }
            
        } catch (error) {
            setLoading(false)
            console.log(error);
            setError(error)
        }
    }

    useEffect(() =>{
        fetchAutoSearch();
    },[])

    console.log(user, filteredUser);
    

    return (
        <div className="search-autocomplete-container">
            <h1>Find Users</h1>
            {
                loading ? (
                    <h1>Loading data ! Please wait</h1>
                ) : (
                    <input 
                        type="text"
                        name="search-users"
                        value={searchParam}
                        onChange={handleChange}
                        placeholder="Search users here..." /> 
                )
            }

            {showDropdown && <Suggestions handleClick={handleClick} data={filteredUser} />}

        </div>
    )    
}
