var ajax = {
		//进入页面初始获取项目列表
		getTotalProject: function(requestUrl) {
			$.ajax({
				url: requestUrl,
				success: function(data,textStatus) {
					var template = $('#project-template').html();
					var f = Handlebars.compile(template);
					var content = f(data.object);
					$('#pro-obj').append(content);
				},
				error: function(XMLHttpRequest, textStatus) {
					console.log('请求失败'+XMLHttpRequest.readyState+textStatus+XMLHttpRequest.status);
				}
			});
		},
		// 获取点击项目的数据
		getProjectData: function(requestUrl) {
			$.ajax({
				url: requestUrl,
				success: function(data) {
					if($('#introduce-plate').children().length<=1){
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
					if($('.file-wrap').children().length==0){
						var template = $('#file-template').html();
						var f = Handlebars.compile(template);
						var content = f(data.object);
						$('.file-wrap').append(content);
						if($('.file-wrap').children().length>4){
							$('.file-wrap').find('.file-folder:gt(3)').hide();
							$('#check-all').show();
						}
					}
				},
				error: function() {
					console.log('文件获取失败');
				}
			});
		},
		//上传文件接口
		postFilesPort: function(serverUrl, fileData) {
			$.ajax({
				url: serverUrl,
				data: fileData,
				type: 'POST',
				contentType: false,
				processData: false,
				beforeSend: function() {
					$('file-wrap').append('<div class="file-folder"><span class="glyphicon glyphicon-file"></span><p>' + fileData.name +
						'</p><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" style="min-width: 2em">0%</div></div><a href="javascript:;">取消</a></div>')
				},
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
				error: function() {
					console.log('文件上传失败');
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
		deleteFile: function(requesturl,fileId) {
			$.ajax({
				url: requesturl,
				type:'post',
				data:{},
				success: function() {
					deleteFile.remove();
					$('.sure-delete').hide();
					deleteFile = null;
				},
				error: function() {
					console.log('删除失败');
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
				async:false,
				success: function(data) {
					var template = $('#member-template').html();
					var f = Handlebars.compile(template);
					var content = f(data.object);
					$('.project-member').append(content);
					memberData=data.object[0];
				},
				error: function() {
					console.log('获取成员列表时出错，请重新获取！');
				}

			});
			console.log(memberData)
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
						'</span><br>'+'<a href="javascript:;">&times;</a></li>');
				},
				error: function() {
					console.log('添加失败');
				}
			});
		},
		// 删除成员请求
		deleteMember: function(requestUrl) {
			memberData={'name':'MEI','id':'1','projectMember':memberData};
			$.ajax({
				url: requestUrl,
				type:'post',
				dataType:'json',
				data:memberData,
				success: function(data) {
					console.log(data)
					console.log(memberData)
					// $('.project-member')
				},
				error:function(XMLHttpRequest, textStatus){
					console.log(XMLHttpRequest.readyState+textStatus+XMLHttpRequest.status);
				}
			})
		}
	};