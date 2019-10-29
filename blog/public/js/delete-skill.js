$(function() {
   $('.js-delete-skill').click(function() {
       //alert("alert message");
       var self = $(this);
       var idSkill = self.attr('id').trim();
       if($.isNumeric(idSkill)){
            $.ajax({
                url: "/admin/skill/deactive-skill",
                type: "POST",
                data: {id: idSkill},
                beforeSend: function(){
                    self.text('Loading ...');
                },
                success: function(result){
                    result = $.trim(result);
                    if(result === 'error' || result === 'fail'){
                        alert('Error happened');
                    } else {
                        alert("success");
                        window.location.reload(true);
                    }
                }
            });
       }
   });

   $('.js-search-skill').click(function(){
        var keyword = $('.js-keyword').val().trim();
        if(keyword.length > 0){
            window.location.href = "/admin/skill?keyword=" + keyword;
        }
   });
});