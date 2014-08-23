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
            var chkboxParent = $(this).parent();

            // Check to see if we are inside of a label.
            if (chkboxParent[0].nodeName.toLowerCase() == "label") {
                // The parent element is a label
                $(chkboxParent).addClass("checkedMarkedlabel");
            }            
            if ($(this).parent().hasClass("checkMarked")){                
                $(this).unwrap("<span></span>");
            }
            
            // Create new checkbox and hide old one
            $(this).wrap("<span class='checkMarked'></span>");
            $(".checkMarked input[type='checkbox']").addClass("sr-only");
            
            // Check to see if checkbox is already checked
            if ($(this).attr("checked")) {
                $(this).closest(".checkMarked").toggleClass("checked");
            }
        });

        labelClick = function(event){
            // Without this we would get double click
            event.preventDefault();
            var chkbox = $(this).find(".checkMarked");
            toggleCheckBox(chkbox);
        };
        checkedMarkedClick = function(event){
            event.preventDefault();
            event.stopPropagation();
            toggleCheckBox(this);
        };
        
        // Handle Label Click
        var checkedMarkedLabel = $(".checkedMarkedlabel");
        checkedMarkedLabel.unbind("click", labelClick);
        checkedMarkedLabel.bind("click", labelClick);

        // Handle Actual Checkbox Click
        var checkedMarked = $(".checkMarked");
        checkedMarked.unbind("click", checkedMarkedClick);
        checkedMarked.bind("click", checkedMarkedClick);        

        return this;
    };
})(jQuery);
