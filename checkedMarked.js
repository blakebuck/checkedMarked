(function ($) {
    $.fn.checkedMarked = function () {
        var toggleCheckBox = function (chkbox) {
            // Toggle checkmark
            $(chkbox).toggleClass("checked");

            // Toggle checkbox checked status.
            $(chkbox).find("input[type='checkbox']").prop('checked', function (i, value) {
                return !value;
            });
        };

        return this.each(function() {

            // Determine if parent is a label
            var chkboxParent = $(this).parent();
            if (chkboxParent[0].nodeName.toLowerCase() == "label"){

                // Wrap label text in span
                $(chkboxParent).contents().filter(function() {
                    var re = /\S/;
                    return this.nodeType === 3 && re.test(this.nodeValue);
                })
                    .wrap("<span class=\"checkedMarkedlabelTxt\"></span>");

                // Give parent label a class name
                $(chkboxParent).addClass("checkedMarkedlabel");
            }

            // Create new checkbox and hide old one
            $(this).wrap("<span class='checkMarked'></span>");
            $(".checkMarked input[type='checkbox']").addClass("sr-only");

            // Check to see if checkbox is already checked
            if ($(this).attr("checked")) {
                $(this).closest(".checkMarked").toggleClass("checked");
            }

            // Handle label click
            $(this).closest(".checkedMarkedlabel").click(function(){
                event.preventDefault();
                var chkbox = $(this).find(".checkMarked");
                toggleCheckBox(chkbox);
            });

            // Handle new checkbox click
            $(this).closest(".checkMarked").click(function(){
                event.preventDefault();
                event.stopPropagation();
                toggleCheckBox(this);
            });

            // Handle old checkbox change (Change due to tab + space)
            $(this).keydown(function(e){
                // Detect space (used to toggle checkboxes)
                if(e.keyCode == 32){
                    // Toggle checkbox (this will be undone by the toggleCheckBox function)
                    $(this).prop('checked', function (i, value) {
                        return !value;
                    });
                    var chkbox = $(this).find(".checkMarked");
                    toggleCheckBox(chkbox);
                }
            });
        });
    };
})(jQuery);
