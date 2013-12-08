---
layout: page
title: შესავალი
description: Hello GeoKey!
---
{% include JB/setup %}

იხილეთ პროექტის სორსი GitHub-ზე [dnatsvlishvili/geo-key-js](http://github.com/dnatsvlishvili/geo-key-js)

ამ გვერდებზე ნახავთ პროექტის დემონსტრაციებს და გამოყენების მაგალითებს.

## რატომ გაკეთდა კიდევ ერთი ბიბლიოთეკა?

ამგვარი ბიბლიოთეკის რამდენიმე ვერსია არსებობს. ორი ყველაზე ცნობილი ნამუშევარია

[ioseb/geokbd](http://github.com/ioseb/geokbd) და [ngfw/jQuery-Geo-Typing](http://github.com/ngfw/jQuery-Geo-Typing)

მიუხედავად იმისა, რომ ორივე ნაშრომი საკმაოდ პოპულარული და ფასეულია, გადავწყვიტე ჩემთვის ჩემივე ვერსია შემექმნა, რადგან ასე ჩემთვის უფრო მოხერხებული იქნებოდა მასთან მუშაობა. ბიბლიოთეკა სახალხოდაა გამოქვეყნებული და მსურველებისთვის ღიაა, თუმცა ამ პროექტის მიზანი არაა კონკურენცია გაუწიოს უკვე არსებულ ნამუშევრებს.

## რას მოიცავს ბიბლიოთეკა?

ბიბლიოთეკის ბირთვი მოთავსებულია ერთ ფაილში [```geo-key.js```](https://github.com/dnatsvlishvili/geo-key-js/blame/master/geo-key.js), რომლითაც შესაძლებელია ```INPUT```, ```TEXTAREA```, ```DIV[CONTENTEDITABLE]``` და ```IFRAME``` ტეგებს შეუცვალონ კლავიატურის მოქმედების პრინციპი ლათინური ასოებით წერისას. ეს ფაილი სხვა დამატებით ფუნქციებს არ მოიცავს, თუმცა მასში შესაძლებელია თავისივე სამი ```plugin```-ის ჩამატება, რომელთა სორსიც ასევე ღიაა, [```geo-key.hotkey.js```](https://github.com/dnatsvlishvili/geo-key-js/blame/master/geo-key.hotkey.js), [```geo-key.indicator.js```](https://github.com/dnatsvlishvili/geo-key-js/blame/master/geo-key.indicator.js), [```geo-key.checkbox.js```](https://github.com/dnatsvlishvili/geo-key-js/blame/master/geo-key.checkbox.js)

[```geo-key.hotkey.js```](https://github.com/dnatsvlishvili/geo-key-js/blame/master/geo-key.hotkey.js) ფაილი ფუნქციონალობას მატებს ბიბლიოთეკის ბირთვს და შესაძლებლობას იძლევა კლავიატურის ღილაკის დაჭერისას ავტომატურაც ცვალოს მოქმედების რეჟიმი.

[```geo-key.indicator.js```](https://github.com/dnatsvlishvili/geo-key-js/blame/master/geo-key.hotkey.js) ფაილი საშუალებას იძლევა ვიზუალურად წარმოადგინოს მიმდინარე რეჟიმი და მაუსის ღილაკის გამოყენებით მომხმარებელს შეაცვლევინოს ის.

[```geo-key.checkbox.js```](https://github.com/dnatsvlishvili/geo-key-js/blame/master/geo-key.hotkey.js) ფაილი იძლევა შესაძლებლობას გამოიყენოთ ```INPUT[TYPE=CHECKBOX]``` ელემენტი და მასთან სინქრონიზირებულად ხდებოდეს ბიბლიოთეკის მოქმედება.

## როგორ ხდება ბიბლიოთეკის ინიციალიზაცია?

GeoKey ბიბლიოთეკა აგებულია Javascript-ის ერთ კონსტრუქტორზე სახელით ```GeoKey```, არსებული და სავარაუდოდ სამომავლო ```plugin```-ები, ამ კონსტრუქტორს მისი ცვლილების გარეშე უკავშირდებიან. თქვენს პროექტში ამ ბიბლიოთეკის ინიციალიზაცია ხდება ძალიან მარტივად, ფუნქციის კონსტრუქტორის ცალკეული შემთხვევის შექმნით:

{% highlight javascript %}
(function(){
  var params = {}; // პარამეტრების ობიექტი
  new GeoKey(params); // კონსტრუქტორის ინიციალიზაცია 
})();
{% endhighlight %}

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## პროექტის განვითარება

ამ მომენტისთვის არ იგეგმება ბიბლიოთეკისთვის ახალი ფუნქციის მიმატება, თუმცა თუ თვლით რომ შეძლებთ წვლილი შეიტანოთ ამ პროქტის განვითარება / ცვლილებაში [გთხოვთ შექმნათ fork-ი](http://github.com/dnatsvlishvili/geo-key-js) და გამოგზავნოთ ```pull``` მოთხოვნა.

