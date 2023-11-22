import cancelIcon from '../../assets/cancel.png'
import './Story.css'
import userIcon from '../../assets/perfil.png'
import corazonIcon from '../../assets/corazon.png'
import sendIcon from '../../assets/send.png'

export const Story = () => {
    return (
      <div className="story">
        <img src={cancelIcon} />
        <div className='story-posts'>
            <div>
                <img src={userIcon} />
                <p>@elpicnic</p>
            </div>
            <img src="https://appsumo2-cdn.appsumo.com/media/selfsubmissions/images/c5cc664b-ec2c-4776-91a5-813690ffc25d.png" />
            <div>
                <img src={corazonIcon} />
                <input type="text" />
                <img src={sendIcon} />
            </div>
        </div>
        <div className='bg'></div>
      </div>
    );
  };