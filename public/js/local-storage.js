
    //all notes get pushed into here
    // let notes = [];

    var siteData = {
        siteName: "My site",
        siteDescription: "Another JS Site"
    }
    var siteData2 = {
        siteName: "My site 2",
        siteDescription: "Another JS Site 2"
    }
    var localData;
    var localData2;

    //creating a string
    localStorage.setItem("siteData", JSON.stringify(siteData));
    localStorage.setItem("siteData2", JSON.stringify(siteData2));
    
    //parsing back to an object
    localData = JSON.parse(localStorage.getItem("siteData"))
    localData2 = JSON.parse(localStorage.getItem("siteData2"))

    console.log(localData);
    console.log(localStorage.getItem("siteData"))



    // Headers.innerHTML = localData.siteName;

//notes
    //can store data but only in string format   
    //must parse when reading to Javascript object
    //