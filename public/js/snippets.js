$(document).ready(function () {

    let notes = [];

    let currentIndex = null;

    const editor = window.editor;

    $(".back-button").hide();
    $(".update-button").hide();
    $(".delete-button").hide();

    $(document).on("click", ".delete-button", function() {
        notes.splice(currentIndex, 1);
        renderNotes(); 
        $("#title-name").val(""); 
        editor.setValue("");
    })

    function renderNotes() {
        $(".items").html("");
        for (var i = 0; i < notes.length; i++) {
            $(".items").append('<li><textarea class="items-input" data-index="' + i + '">' + notes[i].title + "\n" + notes[i].content.slice(0, 11) + '...</textarea></li>')
        }
    }
    renderNotes();

    //snippets
    $(".save-button").on("click", function (event) {
        event.preventDefault();

        var title = $("#title-name").val();        
        var content = editor.getValue()
    
     
        const note = {
            title,
            content
        };

        notes.push(note);

        renderNotes();  
        $("#title-name").val(""); 
        editor.setValue(""); 

    })

      //snippet
    //Title and Code show up again after being clicked
    $(document).on("click", ".items-input", function () {
      
        const index = $(this).data("index");
        currentIndex = index;       
        
        $("#title-name").val(notes[index].title);
        editor.setValue(notes[index].content);
        
        
        $(".delete-button").show();


       renderNotesEditor();
       
    });


});