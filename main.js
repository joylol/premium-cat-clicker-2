var model = {
	currentCat: null,
	cats: [
		{
			name: 'KitKat',
			imageSRC: 'cat.jpg',
			clickCount: 0
		},
		{
			name: 'FunKat',
			imageSRC: 'cat2.jpg',
			clickCount: 0
		},
		{
			name: 'BooKat',
			imageSRC: 'cat3.jpg',
			clickCount: 0
		},
		{
			name: 'LolKat', 
			imageSRC: 'cat4.jpg',
			clickCount: 0
		},
		{
			name: 'FoxKat',
			imageSRC: 'cat5.jpg',
			clickCount: 0
		}
	]
};

var octopus = {
	init: function() {
		listView.init();
		imageView.init();
	},
    getCats: function() {
    	return model.cats;
    },
    setCurrentCat: function(clickedCat) {
    	model.currentCat = clickedCat;
    },
    getCurrentCat: function() {
    	return model.currentCat;
    },
    addClickCount: function() {
    	model.currentCat.clickCount ++;
    	imageView.render();
    }

};

var listView = {
	init: function() {
		this.catListElem = document.getElementById('catList');
		this.render();
	},
	render: function() {
		var i, btn, cat;
		var cats = octopus.getCats();
		for(i = 0; i < cats.length; i++) {
			cat = cats[i];
			btn = document.createElement('Button');
			btn.textContent = cat.name;
			btn.addEventListener('click', (function(catCopy){
				return function() {
					octopus.setCurrentCat(catCopy);
					imageView.render();
				};
			})(cat));
			this.catListElem.appendChild(btn);
		}	
	}
};

var imageView = {
	init: function() {
		this.catNameElem = document.getElementById('catName');
		this.catImageElem = document.getElementById('catImage');
		this.clickCountElem = document.getElementById('clickCountNum');
		this.catImageElem.addEventListener('click', function() {
			octopus.addClickCount();
		});
	},
	render: function() {
		var catToBeRendered = octopus.getCurrentCat();
		this.catNameElem.textContent = catToBeRendered.name;
		this.catImageElem.src = catToBeRendered.imageSRC;
		this.clickCountElem.textContent = catToBeRendered.clickCount;
	}
};

octopus.init(); 