---
layout: page
title: პლაგინები
description: ჯერ სულ სამი
group: navigation
---
{% include JB/setup %}

ახლა განვიხილოთ ის სამი პლაგინი და უკვე ვიმუშაოდ არა ყველა ელემენტზე, არამედ ცალკეულ შემთხვევებზე.

<hr />

### geokey.hotkey.js

```geokey.hotkey.js``` პლაგინის მოქმედება განხილულია [მარტივ მაგალითებში](3-simple.html)

დანარჩენი ორი დამოკიდებულია ამ უკანასკნელზე, ანუ თუ გსურთ ```geokey.checkbox.js```-ს ან ```geokey.indicator.js```-ს გამოყენებაც, აუცილებელია ```geokey.hotkey.js``` ჩაამატოთ მანამდე, წინააღმდეგ შემთხვევაში ბრაუზერის კონსოლში გამოჩნდება შეტყობინება მითითებებით.

### geokey.checkbox.js

<label class="checkbox">
  <input type="checkbox" id="work-ka" /> 
  ქართული
</label>

<br/>
<br/>

<div>
  <div>
    <input class="checkbox-demo" type="text" />
  </div>
  <div>
    <br/>
    <input type="text" value="ამ ელემენტზე არ გავრცელდეს!" />
  </div>
</div>
<hr />

{% highlight html %}

<input type="checkbox" id="work-ka" /> 
<input class="checkbox-demo" type="text" />

<script type="text/javascript">  
  var checkboxDemo = new GeoKey({
    target: 'checkbox-demo', // ვუყურებთ ელემენტს კლასით checkbox-demo
    work: 'yes', // თავიდანვე ვანიჭებთ ქართულ ენას
    hotkey: 'no', // არ ვითვალისწინებთ ~ ღილაკს
    checkbox: 'work-ka' // CHECKBOX ელემენტად ვიღებთ მას რომელსაც მინიჭებული აქვს id-ად work-ka
  });
</script>
{% endhighlight %}

<hr/>

### geokey.indicator.js

{% highlight html %}

<div class="switch">
  <div class="geo"><a href="javascript:void(0);" class="flag">GE</a></div>
  <div class="eng"><a href="javascript:void(0);" class="flag">EN</a></div>
</div>

<input class="indicator-demo" type="text" />

<script type="text/javascript">  
  var indicatorDemo = new GeoKey({
    target: 'indicator-demo', // ვუყურებთ მხოლოდ ელემენტებს კლასით indicator-demo
    work: 'yes', // თავიდანვე გადაგვყავს ნაწერი ქართულში
    hotkey: 'yes', // ვითვალისწინებთ ~ ღილაკს
    indicator: 'switch' // ინდიკატორის DIV კლასია switch
  });
</script>
{% endhighlight %}

<div class="input-prepend">
  <span class="add-on">
    <div class="switch">
      <div class="geo"><a href="javascript:void(0);" class="flag">GE</a></div>
      <div class="eng"><a href="javascript:void(0);" class="flag">EN</a></div>
    </div>
  </span>
  <input class="span2 indicator-demo" id="prependedInput" type="text" style="width:170px;" />
</div>

<script type="text/javascript">  
	(function(){
    var checkboxDemo = new GeoKey({
  	  target: 'checkbox-demo',
      work: 'yes',
      hotkey: 'no',
      checkbox: 'work-ka',
      indicator: 'no'
  	});
  })();
  
  (function(){
    var indicatorDemo = new GeoKey({
      target: 'indicator-demo',
      work: 'yes',
      hotkey: 'yes',
      indicator: 'switch',
      checkbox: 'no'
    });
  })();
</script>
