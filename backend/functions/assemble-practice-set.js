var assemblePracticeSet = function(questionBank) {
  var que = [];
  for (var i = 0; i < questionBank.length; i++) {
    if (questionBank[i].m === 1) {
      for (var j = i+1; j < questionBank.length; j++) {
        if(questionBank[j].m === 1) {
          que.push(questionBank[i]);
          que.push(questionBank[j]);
          que.push(questionBank[i]);
          que.push(questionBank[j]);
          i = j;
          break;
        } else if (questionBank[j].m === 2) {
          que.push(questionBank[i]);
          que.push(questionBank[j]);
          que.push(questionBank[i]);
          i = j;
          break
        }
      }
    } else if (questionBank[i].m === 2) {
      for (var j = i+1; j < questionBank.length; j++) {
        if(questionBank[j].m === 1) {
          que.push(questionBank[j]);
          que.push(questionBank[i]);
          que.push(questionBank[j]);
          i = j;
          break;
        } else if (questionBank[j].m === 2) {
          que.push(questionBank[i]);
          que.push(questionBank[j]);
          i = j;
          break
        }
      }
    } else if (questionBank[i].m === 3 && questionBank[i+1]) {
      for (var j= i+1; j < questionBank.length; j++ ) {
        if (questionBank[j].m === 2 && j < questionBank.length - 1) {
          que.push(questionBank[j]);
          for (var k = j+1; k < questionBank.length; k++) {
            if (questionBank[k].m === 1 && questionBank[k+1].m === 1) {
              que.push(questionBank[k])
              que.push(questionBank[k+1])
              que.push(questionBank[i])
              que.push(questionBank[k])
              que.push(questionBank[k+1])
              j = k + 1;
              break;
            } else if (questionBank[k].m === 2) {
              que.push(questionBank[k])
              que.push(questionBank[i])
              j = k + 1;
              break;
            }
          }
          i = j;
          break;
        } else if (questionBank[j].m === 3 && j+2 < questionBank.length - 1) {
          for (var k = j+1; k < questionBank.length; k++) {
            if (questionBank[k].m === 1 && questionBank[k+1].m === 1) {
              que.push(questionBank[k])
              que.push(questionBank[k+1])
              que.push(questionBank[i])
              que.push(questionBank[k])
              que.push(questionBank[k+1])
              que.push(questionBank[j])
              j = k + 1;
              break;
            } else if (questionBank[k].m === 2 && questionBank[k+1].m === 1) {
              que.push(questionBank[k+1])
              que.push(questionBank[i])
              que.push(questionBank[k])
              que.push(questionBank[k+1])
              que.push(questionBank[j])
              j = k + 1;
              break;
            } else if (questionBank[k].m === 2 && questionBank[k+1].m === 2) {
              que.push(questionBank[i])
              que.push(questionBank[k])
              que.push(questionBank[k+1])
              que.push(questionBank[j])
              j = k + 1;
              break;
            }
            i = j;
            break;
          }
        } else if (questionBank[j].m === 3 && j+1 < questionBank.length - 1) {
            for (var k = j+1; k < questionBank.length; k++) {
              if (questionBank[k].m === 2 && questionBank[k+1].m === 1) {
                que.push(questionBank[k])
                que.push(questionBank[i])
                que.push(questionBank[k+1])
                que.push(questionBank[j])
                que.push(questionBank[k+1])
                j = k + 1;
                break;
              }
              else if (questionBank[k].m === 3 && questionBank[k+1].m === 1) {
                que.push(questionBank[i])
                que.push(questionBank[k+1])
                que.push(questionBank[j])
                que.push(questionBank[k+1])
                que.push(questionBank[k])
                j = k + 1;
                break;
              }
            }
            i = j;
            break;
        } else if (j < questionBank.length - 1) {
          if (questionBank[j+1].m === 1) {
            que.push(questionBank[j+1])
            que.push(questionBank[i])
            que.push(questionBank[j+1])
            que.push(questionBank[j])
          } else if (questionBank[j+1].m ===2) {
            que.push(questionBank[i])
            que.push(questionBank[j+1])
            que.push(questionBank[j])
          }
          i = j;
          break;
        } else {
          if (questionBank[j].m === 2) {
            que.push(questionBank[j])
            que.push(questionBank[i])
          } else if (questionBank[j].m === 3) {
            que.push(questionBank[i])
            que.push(questionBank[j])
          }
          i = j;
          break;
        }
      }
    } else if (questionBank[i].m === 3 && i === questionBank.length - 1) {
        que.push(questionBank[i])
    }
  };
  return que.slice(0,1);
}

module.exports = assemblePracticeSet;
