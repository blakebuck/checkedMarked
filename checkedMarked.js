(function( $ ) { 
    var toggleCheckBox = function () {
        // Toggle checkmark image
        $(".checkMarked").toggleClass("checked");
        // Toggle checkbox checked status.
        $(".checkMarked input").prop('checked', function (i, value) {
            return !value;
        });
    };

    $.fn.checkedMarked = function() {
        // Get checkbox's parent (used later to tell if chkbox is inside label)
        chkbxParent = this.parent();
        
        // Create new checkbox and hide old one
        this.wrap("<span class='checkMarked'>&nbsp</span>");
        $(".checkMarked input").hide();
        
        // Check to see if we are inside of a label.
        if (chkbxParent[0].nodeName.toLowerCase()=="label"){
            // The parent element is a label
            $(chkbxParent).addClass("checkedMarkedlabel");
            $(".checkedMarkedlabel").click(function(event){
            // Without this we would get double click
                event.preventDefault();
                toggleCheckBox();        
            });        
        }
        else {
            // Parent is not a label
            $(".checkMarked").click(toggleCheckBox);
        }        
        return this; 
    };
})(jQuery);
