import React from 'react'
import './rightbar.scss'
function rightbar() {
  return (
    <div className="rightbar">
        <div className="container">
            <div className="item">
                <span>Suggestions For You</span>
                <div className="user">
                    <div className="userInfo">
                        <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg&w=1987&h=3000" alt="" />
                        <span>Josh</span>
                    </div>
                    <div className="buttons">
                        <button>Follow</button>
                        <button>Dismiss</button>
                    </div>
                </div>
                <div className="user">
                    <div className="userInfo">
                        <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg&w=1987&h=3000" alt="" />
                        <span>Josh</span>
                    </div>
                    <div className="buttons">
                        <button>Follow</button>
                        <button>Dismiss</button>
                    </div>
                </div>
            </div>
            <div className="item">
                <span>Updates</span>
                <div className="user">
                    <div className="userInfo">
                        <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg&w=1987&h=3000" alt="" />
                        <p>
                            <span>Josh </span>
                            changed their cover picture
                        </p>
                    </div>
                    <span>1 min ago</span>
                </div>
                <div className="user">
                    <div className="userInfo">
                        <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg&w=1987&h=3000" alt="" />
                        <p>
                            <span>Josh </span>
                            liked your post
                        </p>
                    </div>
                    <span>25 min ago</span>
                </div>
                <div className="user">
                    <div className="userInfo">
                        <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg&w=1987&h=3000" alt="" />
                        <p>
                            <span>Josh </span>
                            has a new post
                        </p>
                    </div>
                    <span>35 min ago</span>
                </div>
                <div className="user">
                    <div className="userInfo">
                        <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg&w=1987&h=3000" alt="" />
                        <p>
                            <span>Josh </span>
                            created a new account
                        </p>
                    </div>
                    <span>45 min ago</span>
                </div>
            </div>
            <div className="item">
                <span>Online Friends</span>
                <div className="user">
                    <div className="userInfo">
                        <div style={{position: "relative"}}>
                        <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg&w=1987&h=3000" alt="" />
                        <div className="online"></div>
                        </div>
                        <span>Josh </span>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default rightbar