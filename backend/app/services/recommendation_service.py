import math


def calculate_distance(
    accident_lat,
    accident_lon,
    hospital_lat,
    hospital_lon
):
    """
    Calculate distance between accident and hospital
    using Haversine Formula.
    """

    earth_radius = 6371

    lat1 = math.radians(float(accident_lat))
    lon1 = math.radians(float(accident_lon))

    lat2 = math.radians(float(hospital_lat))
    lon2 = math.radians(float(hospital_lon))

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1)
        * math.cos(lat2)
        * math.sin(dlon / 2) ** 2
    )

    c = 2 * math.atan2(
        math.sqrt(a),
        math.sqrt(1 - a)
    )

    distance = earth_radius * c

    return round(distance, 2)
def calculate_score(
    distance_km,
    available_beds,
    emergency_available
):
    """
    Calculate recommendation score.
    Maximum score = 100
    """

    score = 0

    # Emergency Score (40)
    if emergency_available:
        score += 40

    # Bed Score (30)
    bed_score = min(available_beds, 30)
    score += bed_score

    # Distance Score (30)
    distance_score = max(0, 30 - distance_km)
    score += distance_score

    return round(score, 2)
def get_recommended_hospitals(
    db,
    accident_lat,
    accident_lon,
    limit: int = 5
):
    """
    Main Recommendation Engine:
    Returns ranked hospitals based on:
    - Distance
    - Emergency availability
    - Available beds
    """

    from app.models.hospital import Hospital

    hospitals = db.query(Hospital).all()

    results = []

    for hospital in hospitals:

        # Skip hospitals with missing coordinates
        if not hospital.latitude or not hospital.longitude:
            continue

        # 1. Calculate distance
        distance = calculate_distance(
            accident_lat,
            accident_lon,
            hospital.latitude,
            hospital.longitude
        )

        # 2. Calculate score
        score = calculate_score(
            distance_km=distance,
            available_beds=hospital.available_beds,
            emergency_available=hospital.emergency_available
        )

        # 3. Build response object
        results.append({
            "id": hospital.id,
            "name": hospital.name,
            "address": hospital.address,
            "phone": hospital.phone,
            "distance_km": distance,
            "available_beds": hospital.available_beds,
            "emergency_available": hospital.emergency_available,
            "recommendation_score": score
        })

    # 4. Sort by score (highest first)
    results.sort(
        key=lambda x: x["recommendation_score"],
        reverse=True
    )

    # 5. Mark best hospital
    if results:
        results[0]["is_best_match"] = True

    return results[:limit]