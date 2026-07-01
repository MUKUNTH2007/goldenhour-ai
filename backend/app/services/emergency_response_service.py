from app.services.recommendation_service import (
    get_recommended_hospitals
)


def get_best_hospital(
    db,
    accident_lat,
    accident_lon
):
    """
    Returns the highest ranked hospital.
    """

    hospitals = get_recommended_hospitals(
        db=db,
        accident_lat=accident_lat,
        accident_lon=accident_lon,
        limit=1
    )

    if not hospitals:
        return None

    return hospitals[0]


def route_emergency(
    db,
    accident_lat,
    accident_lon
):
    """
    Main emergency routing workflow.
    Finds the best hospital and returns it.
    """

    best_hospital = get_best_hospital(
        db=db,
        accident_lat=accident_lat,
        accident_lon=accident_lon
    )

    return best_hospital