/**
 * 基于jquery的数据验证插件
 */
(function(window,fuc,plug){
  fuc(jQuery,plug);
}(this,function(jQuery,plug){
  //默认配置
  var DEFAILT = {
    initEvent:'blur',
    plugName:'dv'
  }
  //校验规则
  var _RULES = {
    'regexp':function(data){
      return new RegExp(data).test(this.val());
    },
    'required':function(data){
      return this.val();
    },
    'min-length':function(data){
      return this.val().length > data;
    },
    'max-length':function(data){
      return this.val().length < data;
    },
    'confirm':function(data){
      var passEl = $(':password')[0];
      if(passEl.value == ''|| this.val()!=passEl.value){
        return false;
      }else{
        return true;
      }
    }
  }
  $.fn[plug] = function(options){  
    if(!this.is('form')){return;}
    this.find = this.find('input');
    $.extend(this,DEFAILT,options);
    this.find.on(this.initEvent,function(){
      var _this = $(this);
      _this.siblings('p').remove();
      $.each(_RULES,function(key,fn){
        var $fileName = _this.data(DEFAILT.plugName+'-'+key);
        var $message = _this.data(DEFAILT.plugName+'-'+key+'-mes');
        console.log($message);
        if($fileName){
          var result = fn.call(_this,$fileName);
          if(!result){
            _this.after('<p style="color:red;">'+$message+'</p>');
          }
        }
      });
    })
  }
  $.fn[plug].extraPlug = function(){
    $.extend(_RULES,options)
  }
},'validate-jq'))