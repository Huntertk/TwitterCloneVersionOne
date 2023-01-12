import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetInput = document.getElementById('tweet-input')

document.addEventListener('click', function(event){
    if(event.target.dataset.like){
        handleLikeClick(event.target.dataset.like)
    } else if(event.target.dataset.retweet){
        handleRetweetClick(event.target.dataset.retweet)
    } else if(event.target.dataset.reply){
        handleCommentClick(event.target.dataset.reply)
    } else if(event.target.id === 'tweet-btn'){
        handleTweetBtn()
    }
})


function handleTweetBtn(){
    if(tweetInput.value){

        tweetsData.unshift({
            handle: `@Taufik✅`,
            profilePic: `images/taufik.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ""
    }
}

function handleLikeClick(likeId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === likeId
    })[0]
    if(targetTweetObj.isLiked === true){
        targetTweetObj.likes --
        targetTweetObj.isLiked = false
    } else if(targetTweetObj.isLiked === false){
        targetTweetObj.likes ++
        targetTweetObj.isLiked = true
    }
    render()
}
function handleRetweetClick(retweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === retweetId
    })[0]
    if(targetTweetObj.isRetweeted == false){
        targetTweetObj.retweets++
        targetTweetObj.isRetweeted = true
    } else if(targetTweetObj.isRetweeted == true){
        targetTweetObj.retweets--
        targetTweetObj.isRetweeted = false
    }
    render()
}
function handleCommentClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}


function getTweetData(){
    let tweetHtml = ``
    tweetsData.forEach(function(tweet){
      

        let isLiked = ''
        let isRetweeted = ''
        if(tweet.isLiked === true){
            isLiked = 'like'
        } else{
            isLiked = ''
        }

        if(tweet.isRetweeted === true){
            isRetweeted = 'retweet'
        } else{
            isRetweeted = ''
        }
        let repliesHtml = ``
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+= `
            <div class="tweet-reply"> 
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-img">
                <div>
                    <p class="handle">${reply.handle}</p>
                    <p class="tweet-text">${reply.tweetText}</p>
                </div>
            </div>
            
            </div>
            
            
                `
            })
        }

        tweetHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img class="profile-img" src="${tweet.profilePic}" alt="">
            <div>   
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    
                    <i class="fa-sharp fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${isLiked}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${isRetweeted}" data-retweet="${tweet.uuid}">
                    </i>
                    ${tweet.retweets}
                    </span>
                </div>
            </div>
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
            ${repliesHtml}
        </div>
    </div>
        ` 
    })
    return tweetHtml 
}   

function render(){
    document.getElementById('feed').innerHTML = getTweetData()
}
    render()