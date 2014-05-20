(function ($) {
    var toggleCheckBox = function (chkbox) {
        // Toggle checkmark image
        $(chkbox).toggleClass("checked");
        // Toggle checkbox checked status.
        $(chkbox).find("input[type='checkbox']").prop('checked', function (i, value) {
            return !value;
        });
    };

    $.fn.checkedMarked = function () {

        // Go through each checkbox individually.
        this.filter( "input[type='checkbox']" ).each(function(){
            // Get checkbox's parent (used to tell if chkbox is inside label)           
            chkboxParent = $(this).parent();

            // Check to see if we are inside of a label.
            if (chkboxParent[0].nodeName.toLowerCase() == "label") {
                // The parent element is a label
                $(chkboxParent).addClass("checkedMarkedlabel");
            }
            
            // Create new checkbox and hide old one
            $(this).wrap("<span class='checkMarked'>&nbsp</span>");
            $(".checkMarked input[type='checkbox']").hide();
            
            // Check to see if checkbox is already checked
            if ($(this).attr("checked")) {
                toggleCheckBox($(this).closest(".checkMarked"));
            }
        });                
        
        // Handle Label Click               
        $(".checkedMarkedlabel").click(function (event) {
            // Without this we would get double click
            event.preventDefault();
            chkbox = $(this).find(".checkMarked");
            toggleCheckBox(chkbox);
        });
        
        // Handle Actual Checkbox Click
        $(".checkMarked").click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            toggleCheckBox(this);
        });

        return this;
    };
})(jQuery);
