// function getLocalStorage(){
// 	if(typeof localStorage == "object"){
// 		return localStorage;
// 	}else if(typeof globalStorage == "object"){
// 		return globalStorage[location.host];
// 	}else{
// 		 throw new Error('不支持本地存储');
// 	}
// }
// var storage=getLocalStorage();

var SubCookieUtil = {

	get: function(name, subName) {
		var subCookies = this.getAll(name);
		if (subCookies) {
			return subCookies[subName];
		} else {
			return null;
		}
	},

	getAll: function(name) {
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null,
			cookieEnd,
			subCookies,
			i,
			parts,
			result = {};

		if (cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(";", cookieStart)
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);

			if (cookieValue.length > 0) {
				subCookies = cookieValue.split("&");

				for (i = 0, len = subCookies.length; i < len; i++) {
					parts = subCookies[i].split("=");
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}

				return result;
			}
		}

		return null;
	},

	set: function(name, subName, value, expires, path, domain, secure) {

		var subcookies = this.getAll(name) || {};
		subcookies[subName] = value;
		this.setAll(name, subcookies, expires, path, domain, secure);

	},

	setAll: function(name, subcookies, expires, path, domain, secure) {

		var cookieText = encodeURIComponent(name) + "=",
			subcookieParts = new Array(),
			subName;

		for (subName in subcookies) {
			if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
				subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));
			}
		}

		if (subcookieParts.length > 0) {
			cookieText += subcookieParts.join("&");

			if (expires instanceof Date) {
				cookieText += "; expires=" + expires.toGMTString();
			}

			if (path) {
				cookieText += "; path=" + path;
			}

			if (domain) {
				cookieText += "; domain=" + domain;
			}

			if (secure) {
				cookieText += "; secure";
			}
		} else {
			cookieText += "; expires=" + (new Date(0)).toGMTString();
		}

		document.cookie = cookieText;

	},

	unset: function(name, subName, path, domain, secure) {
		var subcookies = this.getAll(name);
		if (subcookies) {
			delete subcookies[subName];
			this.setAll(name, subcookies, null, path, domain, secure);
		}
	},

	unsetAll: function(name, path, domain, secure) {
		this.setAll(name, null, new Date(0), path, domain, secure);
	}

};
// 构造分页对象
var Pagination = function(el, proLength, pageNum) {
	this.$el = $(el); //分页容器
	this.totalPro = proLength; // 总项目数
	this.num = pageNum; //每页展示个数
};
Pagination.prototype = {
	constructor: Pagination,
	init: function() {
		var that = this,
			pages = Math.ceil(that.proLength / that.num);
		if (pages > 1) {
			that.$el.append('<li><span>&laquo;</span></li><li><span>&raquo;</span></li>');
			for (let i = 1; i <= pages; i++) {
				that.$el.find('li:nth-child(' + i + ')').after('<li><a href="#">' + i + '</a></li>')
			}
			that.$el.children().eq(1).addClass('active');
		}
	},
	bindEvent: function() {
		var ele = this.$el,
			curIndex = 1;
		return function() {
			ele.on('click', 'li', function(e) {
				if ($(this).index() != 0 && $(this).index() != ele.children().length - 1) {
					curIndex = $(this).index();
					// getData(curIndex);
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					e.preventDefault();
				} else if ($(this).index() == 0) {
					curIndex--;
					if (curIndex < 1) {
						curIndex = 1;
					} else {
						// getData(curIndex);
						$(this).siblings().removeClass('active')
						$(this).parent().find('li:eq(' + curIndex + ')').addClass('active')
					}
				} else if ($(this).index() == $('.fenye li').length - 1) {
					curIndex++;
					if (curIndex > $('.fenye li').length - 2) {
						curIndex = 3;
					} else {
						// getData(curIndex);
						$(this).siblings().removeClass('active')
						$(this).parent().find('li:eq(' + curIndex + ')').addClass('active')
					}
				}
			});
		}();
	},
	excuteFun: function() {
		this.init();
		this.bindEvent();
	}
}
var ajax = {
	//进入页面初始获取项目列表
	getTotalProject: function(requestUrl) {
		$.ajax({
			url: requestUrl,
			success: function(data) {
				var template = $('#project-template').html();
				var f = Handlebars.compile(template);
				var content = f(data.object);
				$('#pro-obj').html(content);
				// $('')
				var page = Math.ceil(data.object.length / 6);
				// if(page>1){
				var pagePag = new Pagination('.fenye', 6);
				pagePag.excuteFun();
				// }
			},
			error: function(XMLHttpRequest, textStatus) {
				console.log('请求失败' + XMLHttpRequest.readyState + textStatus + XMLHttpRequest.status);
			}
		});
	},
	// 获取点击项目的数据
	getProjectData: function(requestUrl) {
		$.ajax({
			url: requestUrl,
			success: function(data) {
				if ($('#introduce-plate').children().length <= 1) {
					var template = $('#introduction-template').html();
					var f = Handlebars.compile(template);
					var content = f(data.object);
					$('#introduce-plate').prepend(content);
				}
			},
			error: function(data) {
				console.log('请求失败');
			}
		});
	},
	// 获取文件
	getFile: function(requestUrl) {
		$.ajax({
			url: requestUrl,
			success: function(data) {
				if ($('.file-wrap').children().length == 0) {
					var template = $('#file-template').html();
					var f = Handlebars.compile(template);
					var content = f(data.object);
					$('.file-wrap').append(content);
					if ($('.file-wrap').children().length > 4) {
						$('.file-wrap').find('.file-folder:gt(3)').hide();
						$('#check-all').show();
					}
				}
				for (var i in data.object) {
					SubCookieUtil.set("data", i, data.object[i]);
				}
				// storage.setItem("fileData",JSON.stringify(data.object));
			},
			error: function() {
				console.log('文件获取失败');
			}
		});
		// storage.setItem("fileData",JSON.stringify(data.object));
	},
	//上传文件接口
	postFilesPort: function(serverUrl,user, proId,fileData) {
		$.ajax({
			url: serverUrl,
			data: fileData,
			type: 'post',
			contentType: 'multipart/form-data',
			mimeType: 'multipart/form-data',
			processData: false,
			// beforeSend: function() {
			// 	$('file-wrap').append(`<div class="file-folder">
			// 		<span class="glyphicon glyphicon-file"></span>
			// 		<p>#{fileData.name}</p>
			// 		<div class="progress">
			// 		    <div class="progress-bar progress-bar-success progress-bar-striped active" style="min-width: 2em">0%
			// 		    </div>
			// 		</div>
			// 		<a href="javascript:;">取消</a>
			// 	</div>`);
			// },
			success: function() {
				// $('.file-wrap .file-folder:last').remove();
				if (('.file-wrap').children().length < 4) {
					$('.file-wrap').append('<div class="file-folder"><span class="glyphicon glyphicon-file"></span><p>' + fileData.name +
						'</p><a href="javascript:;">删除</a></div>');
				}
				$('.no-file').hide();
				var date = new Date(),
					y = date.getFullYear(),
					mon = date.getMonth() + 1,
					d = date.getDate(),
					h = date.getHours(),
					min = date.getMinutes(),
					dateStr = y + '年' + mon + '月' + d + '日' + h + '时' + min + '分';
				$('file-table').append('<tr><th><span class="glyphicon glyphicon-file"></span><span class="file-name">' + fileData.name +
					'<span></td><td>' + dateStr +
					'</td><td>上传者</td><td><button class="btn btn-warning">删除</button></td></tr>');
			},
			error: function(XMLHttpRequest, textStatus) {
				console.log('文件上传失败'+ XMLHttpRequest.readyState + textStatus + XMLHttpRequest.status);
			},
			xhr: function() {
				xhr = jQuery.ajaxSettings.xhr();
				xhr.upload.onprogress = function(e) {
					if (e.lengthComputable) {
						var curProgress = parseInt(e.position / e.totalSize * 100) + '%';
						$('.file-wrap').find('.progress-bar').attr('style', 'width:' + curProgress);
					}
				}
				return xhr;
			}
		});
	},
	// 删除文件
	deleteFile: function(requesturl, fileEle, username) {
		// var fileIndex=fileEle.index();
		// console.log(storage.getItem('fillData'))
		// var temporData=JSON.stringify({file:JSON.parse(storage.getItem('fillData')),name:username});
		// console.log(temporData)
		var tempordata = {};

		$.ajax({
			url: requesturl,
			type: 'post',
			data: temporData,
			success: function() {
				deleteFile.remove();
				$('.sure-delete').hide();
				deleteFile = null;
			},
			error: function() {
				console.log('删除失败');
				$('.sure-delete').hide();
			}
		});
	},
	//获取文件夹内的文件
	getFolderFile: function(requestUrl) {
		$.ajax({
			url: requestUrl,
			success: function() {
				var template = $('#folderFile-template').html();
				var f = Handlebars.compile(template);
				var content = f(data);
				$('.file-table tbody').append(content);
			}
		});
	},
	// 获取项目成员列表
	getProjectMember: function(requesturl) {
		$.ajax({
			url: requesturl,
			async: false,
			success: function(data) {
				var template = $('#member-template').html();
				var f = Handlebars.compile(template);
				var content = f(data.object);
				$('.project-member').append(content);
				memberData = data.object[0];
			},
			error: function() {
				console.log('获取成员列表时出错，请重新获取！');
			}

		});
	},
	// 添加成员请求
	postMember: function(requesturl, name) {
		$.ajax({
			type: 'post',
			url: requesturl,
			data: {
				memberName: name
			},
			success: function() {
				$('.project-member').append('<li><span>' + name +
					'</span><br>' + '<a href="javascript:;">&times;</a></li>');
			},
			error: function() {
				console.log('添加失败');
			}
		});
	},
	// 删除成员请求
	deleteMember: function(requestUrl) {
		memberData = {
			'name': 'MEI',
			'id': '1',
			'projectMember': memberData
		};
		$.ajax({
			url: requestUrl,
			type: 'post',
			dataType: 'json',
			data: memberData,
			success: function(data) {
				console.log(data)
				console.log(memberData)
					// $('.project-member')
			},
			error: function(XMLHttpRequest, textStatus) {
				console.log(XMLHttpRequest.readyState + textStatus + XMLHttpRequest.status);
			}
		})
	}
};