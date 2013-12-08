---
layout: page
title: WYSIWYG
description: TinyMCE-ს მაგალითზე
group: navigation
---
{% include JB/setup %}

ხშირად საჭიროა მსგავსი ფუნქციონალობის WYSIWYG ედიტორებთან ინტეგრაცია. ამ გვერდზე განვიხილავთ მაგალითს TinyMCE-ედიტორთან მიმართებით.

<hr />

### TinyMCE

<textarea>
</textarea>

<br />

<div class="container">
  <div class="row">
    <div class="span4">
      <label class="checkbox">
        <input type="checkbox" id="chk-demo" /> 
        ქართული
      </label>
    </div>
    <div class="span8" style="margin-top:6px;">
      <div class="ind-demo">
        <div class="geo"><a href="javascript:void(0);" class="flag">ახლა იწერება ქართულად</a></div>
        <div class="eng"><a href="javascript:void(0);" class="flag">ახლა იწერება ინგლისურად</a></div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  tinymce.init({
    selector:'textarea',
    setup: function(editor) {
      editor.on('init', function() {
        new GeoKey({
      	  target: '',
          work: 'yes',
          hotkey: 'yes',
          checkbox: 'chk-demo',
          indicator: 'ind-demo'
      	});
      });
    }
  });
</script>


<hr/>


TinyMCE, როგორც სხვა WYSIWYG ედიტორები უმეტესად მოქმედებენ ```IFRAME``` ელემენტზე. ```GeoKey.JS```-ს გააჩნია ამ ელემენტთან ურთიერთობის ფუნქცია, საჭიროა უბრალოდ კონსტრუქტორის გამოძახება საჭირო მომენტში, მაშინ, როდესაც TinyMCE-უკვე დაასრულებს ```TEXTAREA```-ს ```IFRAME```-ად ქცევას.

{% highlight html %}

<textarea>
</textarea>

<label class="checkbox">
  <input type="checkbox" id="chk-demo" /> 
  ქართული
</label>

<div class="ind-demo">
  <div class="geo"><a href="javascript:void(0);" class="flag">ახლა იწერება ქართულად</a></div>
  <div class="eng"><a href="javascript:void(0);" class="flag">ახლა იწერება ინგლისურად</a></div>
</div>

<script type="text/javascript">
  tinymce.init({
    selector:'textarea',
    setup: function(editor) {
      editor.on('init', function() {
        new GeoKey({
      	  target: '',
          work: 'yes',
          hotkey: 'yes',
          checkbox: 'chk-demo',
          indicator: 'ind-demo'
      	});
      });
    }
  });
</script>

{% endhighlight %}