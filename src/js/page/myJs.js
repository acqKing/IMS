require(['../lib/jquery'],function(jq){
	$(function(){
		ajax.getTotalProject('http://192.168.1.103:8080/project/showpros.do');
		
		//视图变换
		$('.switch-view span:eq(0)').click(function() {
			$(this).next().removeClass('view-active');
			$(this).addClass('view-active');
			$('#pro-obj').removeClass('pro-list');
			$('#pro-obj').addClass('pro-grid');
		});
		$('.switch-view span:eq(1)').click(function() {
			$(this).prev().removeClass('view-active');
			$(this).addClass('view-active');
			$('#pro-obj').removeClass('pro-grid');
			$('#pro-obj').addClass('pro-list');
		});

			// 进入项目
		$('#pro-obj').on('click', 'li', function(e) {
			$('#project-plate').show();
			$('#project-plate').css({
				'margin-top': '-535px'
			});
			ajax.getProjectData('http://192.168.1.103:8080/project/showpro.do?projectId='+$(this).index()+1);  //获取项目数据
			ajax.getFile('http://192.168.1.103:8080/project/showfiles.do?projectId='+$(this).index()+1);
			var parents = $(this).parents('.panel');
			parents.css({
				'background-color': '#f9f9f9',
				'width': '930px',
				'cursor': 'pointer'
			});
			parents.one('click', function() {
				$(this).show();
				$(this).siblings('.mypanel').hide();//隐藏其他面板
				$('.add-panel').hide(); 
				$('#project-plate').css({
					'margin-top': '0px'
				});
				$(this).css({
					'background-color': '#fff',
					'width': '960px',
					'cursor': 'default'
				});
				$(this).siblings('.mypanel').css({
					'background-color': '#fff',
					'width': '960px',
					'cursor': 'default'
				})
			});
			e.stopPropagation();
		});
		// 成员操作
		var memberData;
		
		var member = {
				memberShow: function() {
					$('.add-member').click(function() {
						$('.add-panel').slideDown();
						$('.add-panel').animate({
							top: '130px'
						}, 300);
					});
				},
				// 添加成员判断
				addMember: function() {
					$('#add-btn').click(function() {
						var name = $('#searchID').val(),
							right = $('#jurisdiction option:selected').val(),
							nameInput = $('.add-panel .form-group:eq(0)');
						if (name == '') {
							nameInput.addClass('has-error');
							$('.add-panel input')[0].focus();
						} else {
							// ajax.postMember(url,name,right);  提交添加成员申请
							if (right == '超级管理员') {
								$('.project-member').append('<li><img src="img/头像.jpg" class="img-circle"><span>' + name +
									'</span><br><span style="color:red">' + right + '</span><a href="javascript:;">&times;</a></li>');
							} else {
								$('.project-member').append('<li><img src="img/头像.jpg" class="img-circle"><span>' + name +
									'</span><br><span>' + right + '</span><a href="javascript:;">&times;</a></li>');
							}
							nameInput.removeClass('has-error');
							nameInput.find('input').val('');
						}
					});
				},
				// 关闭添加成员选择框
				closeMember: function() {
					$('.add-panel a').click(function() {
						$(this).parent().animate({
							top: '80px'
						}, 300, function() {
							$('.add-panel').slideUp();
						});
						if ($('.add-panel .form-group:eq(0)').hasClass('has-error')) {
							$('.add-panel .form-group:eq(0)').removeClass('has-error');
						}
					});
				},
				//删除成员
				removeMember: function() {
					$('.project-member').on('click', 'a', function() {
						ajax.deleteMember('http://192.168.1.103:8080/project/delmem.do');
					});
				},
				//进入成员面板
				enterMember: function() {
					$('.pro-member').click(function(e) {
						ajax.getProjectMember('http://192.168.1.103:8080/project/showmemes.do?projectId=1');
						$('.member').show();
						$('.member').css({
							'margin-top': '-535px'
						});
						var parents = $(this).parents('.panel');
						parents.css({
							'background-color': '#f9f9f9',
							'width': '930px',
							'cursor': 'pointer'
						});
						parents.one('click', function(e) {
							$(this).show();
							$('.member').hide();
							$('.add-panel').hide();
							$(this).css({
								'background-color': '#fff',
								'width': '960px',
								'cursor': 'default'
							});
						});
						e.stopPropagation();
					});
				}
			}
			//执行member对象中的函数

		for (var fun in member) {
			if (typeof member[fun] === 'function') {
				member[fun]();
			}
		}
		// 文件操作
		var fileObj = function() {
			var deleteFile;
			return {
				//删除文件
				deleteFileFun: function() {
					$('.file-wrap').on('click', '.delete', function(e) {
						$('.sure-delete').show();
						deleteFile = $(this).parent();
						e.stopPropagation();
					});
				},
				//确定删除
				sureDeleteFun: function() {
					$('.sure-delete').find('.btn-danger').click(function() {
						// ajax.deleteFile('http://192.168.1.102:8080/project/showfile.do',$(this).attr('data-id'))
						deleteFile.remove();
						$('.sure-delete').hide();
						deleteFile = null;
					});
				},
				//取消删除
				cancelDeleteFun: function() {
					$('.sure-delete').find('.btn-default').click(function() {
						$('.sure-delete').hide();
						deleteFile = null;
					});
					$('.sure-delete a').click(function() {
						$('.sure-delete').hide();
						deleteFile = null;
					});
				},
				//上传文件
				upload: function() {
					$('.upload-file').change(function(e) {
						var files = e.target.files,
							data = new FormData();
							data.append('file',files);
						//console.log(files,data)
						ajax.postFilesPort('http://192.168.1.102:8080/project/addfile.do',data)  //上传文件接口
					});
				},
				// 删除文件夹
				deleteFolder: function() {
					$('.file-table').on('click', 'button', function(e) {
						$(this).closest('tr').remove();
						if ($('.file-table').children('tbody').children().length == 1) {
							$('.file-table').hide();
							$('.no-file').show();
						}
						e.stopPropagation();
						// ajax.deleteFile(url)
					});
				},
				//进入所有文件夹
				enterAllFolder: function() {
					$('#check-all').click(function(e) {
						$('#folder').show().animate({
							marginTop: '-535px'
						}, 200);
						$('#project-plate').css({
							'background-color': '#f9f9f9',
							'width': '930px',
							'cursor': 'pointer'
						});
						$('#project-plate').one('click', function() {
							$(this).show();
							$('#folder').hide();
							$(this).css({
								'background-color': '#fff',
								'width': '960px',
								'cursor': 'default'
							});
						});
						e.stopPropagation();
					});
				},
			}
		}();
		//执行文件对象的函数
		for (var fileFun in fileObj) {
			if (typeof fileObj[fileFun] === 'function') {
				fileObj[fileFun]();
			}
		}
		// 构造分页对象
		var proPagination = (function() {
			function getData(pageNum) {
				var template = $('#project-template').html(),
					f = Handlebars.compile(template),
					content = f(json[pageNum - 1]);
				$('#pro-obj').html(content);
			}

			function Pagination(el, content, pageNum) {
				this.$el = $(el); //分页容器
				this.$conWrap = $(content); //内容容器
				this.num = pageNum; //每页展示个数
			}
			Pagination.prototype = {
				constructor: Pagination,
				init: function() {
					var conLength = this.$conWrap.children().length,
						pages = Math.ceil(conLength / this.num),
						i;
					if (pages !== 1) {
						this.$el.append('<li><span>&laquo;</span></li><li><span>&raquo;</span></li>');
						for (i = 1; i <= pages; i++) {
							this.$el.find('li:nth-child(' + i + ')').after('<li><a href="#">' + i + '</a></li>')
						}
						this.$el.children().eq(1).addClass('active');
					}
				},
				bindEvent: function() {
					var ele = this.$el,
						curIndex = 1;
					return function() {
						ele.on('click', 'li', function(e) {
							if ($(this).index() != 0 && $(this).index() != ele.children().length - 1) {
								curIndex = $(this).index();
								// ajax.getTotalProject()
								getData(curIndex);
								$(this).addClass('active');
								$(this).siblings().removeClass('active');
								e.preventDefault();
							} else if ($(this).index() == 0) {
								curIndex--;
								if (curIndex < 1) {
									curIndex = 1;
								} else {
									getData(curIndex);
									$(this).siblings().removeClass('active')
									$(this).parent().find('li:eq(' + curIndex + ')').addClass('active')
								}
							} else if ($(this).index() == $('.fenye li').length - 1) {
								curIndex++;
								if (curIndex > $('.fenye li').length - 2) {
									curIndex = 3;
								} else {
									getData(curIndex);
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
			return new Pagination($('.fenye'), $('#pro-obj'), 6);
		})();
		// proPagination.excuteFun();
	});
		


});
