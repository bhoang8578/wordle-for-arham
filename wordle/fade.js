import Highway from '@dogstudio/highway';
import Tween from 'gsap';

class Fade extends Highway.Transition {
    in( {from, to, done}) //how we tell highway that we're done
    {
        from.remove();
        Tween.fromTo(to, 0.5, {opacity: 0}, { opacity: 1, onComplete: done});//the second page
    }
    out( {from, done})
    {
        Tween.fromTo(from, 0.5, {opacity: 1}, { opacity: 0, onComplete: done});
        //the first page
    }
}

//export the fade class
export default Fade;