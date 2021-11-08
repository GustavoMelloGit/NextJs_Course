import AddressIcon from "../../icons/address-icon";
import ArrowRightIcon from "../../icons/arrow-right-icon";
import DateIcon from "../../icons/date-icon";
import Button from "../../ui/Button";
import classes from "./styles.module.css";

export default function EventItem(props) {
  const { title, location, date, image, id } = props;
  const formattedDate = new Date(date).toLocaleDateString();
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li key={props.id} className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
