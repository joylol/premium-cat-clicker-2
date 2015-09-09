var model = {
	currentCat: null,
	adminViewVisible: false,
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
		adminView.init();
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
    	if(model.adminViewVisible) {
    		adminView.render();
    	}
    },
    adminShow: function() {
    	return model.adminViewVisible;
    },
    openAdminView: function() {
    	model.adminViewVisible = true;
    	adminView.render();
    },
    closeAdminView: function() {
    	model.adminViewVisible = false;
    	adminView.hide();
    },
    updateCat: function() {
    	this.catNameContent = document.getElementById('catNameContent').value;
		this.catSRC = document.getElementById('catSRC').value;
		this.catClicks = document.getElementById('catClicks').value;
    	model.currentCat.name = this.catNameContent;
    	model.currentCat.imageSRC = this.catSRC;
    	model.currentCat.clickCount = this.catClicks;
    	this.closeAdminView();
    	imageView.render();
    	listView.render();
    }
};

var listView = {
	init: function() {
		this.catListElem = document.getElementById('catList');
		this.render();
	},
	render: function() {
		this.catListElem.innerHTML = '';
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
					var adminShow = octopus.adminShow();
					if(adminShow) {
						adminView.render();
					}
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

var adminView = {
	init: function() {
		this.adminButtonElem = document.getElementById('adminButton');
		this.adminArea = document.getElementById('adminArea');
		this.cancelBtn = document.getElementById('cancelBtn');
		this.changeBtn = document.getElementById('changeBtn');
		this.catNameContent = document.getElementById('catNameContent');
		this.catSRC = document.getElementById('catSRC');
		this.catClicks = document.getElementById('catClicks');

		this.adminButtonElem.addEventListener('click', function() {
			octopus.openAdminView();
		});
		this.cancelBtn.addEventListener('click', function() {
			octopus.closeAdminView();
		});
		this.changeBtn.addEventListener('click', function() {
			octopus.updateCat();
		});
	},
	render: function() {
		var inputValue = octopus.getCurrentCat();
		if(inputValue == null) {
			alert('Please select a cat to view the Admin Area.');
		}
		else {
			this.catNameContent.value = inputValue.name;
			this.catSRC.value = inputValue.imageSRC;
			this.catClicks.value = inputValue.clickCount;
			this.adminArea.style.display = 'block';
		}
	},
	hide: function() {
		this.adminArea.style.display = 'none';
	}
};

octopus.init(); 